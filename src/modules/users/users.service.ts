import prisma from "../../config/database";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { NotFoundError } from "../../utils/errors";

export class UsersService {
  async getAll() {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return users;
  }

  async getById(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user;
  }

  async updateRole(id: number, data: UpdateRoleDto) {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundError("User not found");
    }

    // Update role
    const user = await prisma.user.update({
      where: { id },
      data: { role: data.role },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return user;
  }
}
