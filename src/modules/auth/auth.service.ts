import prisma from "../../config/database";
import { hashPassword, comparePassword } from "../../utils/password.util";
import { signToken } from "../../utils/jwt.util";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { ConflictError, UnauthorizedError } from "../../utils/errors";

export class AuthService {
  async register(data: RegisterDto) {
    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictError("Email already exists");
    }

    // Hash password
    const hashedPassword = await hashPassword(data.password);

    // Create user
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return user;
  }

  async login(data: LoginDto) {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new UnauthorizedError("Invalid credentials");
    }

    // Check password
    const isPasswordValid = await comparePassword(data.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid credentials");
    }

    // Generate JWT token
    const token = signToken({
      userId: user.id,
      role: user.role,
    });

    return {
      accessToken: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}
