import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.util";
import { UnauthorizedError } from "../utils/errors";
import prisma from "../config/database";

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: string;
  };
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedError("No token provided");
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify token
    const decoded = verifyToken(token);

    // Fetch user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, role: true },
    });

    if (!user) {
      throw new UnauthorizedError("Invalid token");
    }

    // Attach user to request
    req.user = user;

    next();
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return res.status(401).json({
        error: error.message,
        statusCode: 401,
      });
    }
    return res.status(401).json({
      error: "Invalid or expired token",
      statusCode: 401,
    });
  }
};
