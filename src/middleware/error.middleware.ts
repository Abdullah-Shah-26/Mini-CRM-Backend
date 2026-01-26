import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors";
import { Prisma } from "@prisma/client";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Handle known operational errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
      statusCode: err.statusCode,
    });
  }

  // Handle Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Unique constraint violation
    if (err.code === "P2002") {
      const target = (err.meta?.target as string[]) || [];
      return res.status(409).json({
        error: `${target.join(", ")} already exists`,
        statusCode: 409,
      });
    }

    // Record not found
    if (err.code === "P2025") {
      return res.status(404).json({
        error: "Resource not found",
        statusCode: 404,
      });
    }
  }

  // Handle validation errors from class-validator
  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: "Validation failed",
      statusCode: 400,
      details: err.message,
    });
  }

  // Log unexpected errors
  console.error("Unexpected error:", err);

  // Handle unexpected errors
  return res.status(500).json({
    error: "Internal server error",
    statusCode: 500,
  });
};
