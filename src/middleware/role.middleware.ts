import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";
import { ForbiddenError } from "../utils/errors";

export const authorize = (...allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new ForbiddenError("User not authenticated");
      }

      if (!allowedRoles.includes(req.user.role)) {
        throw new ForbiddenError("Insufficient permissions");
      }

      next();
    } catch (error) {
      if (error instanceof ForbiddenError) {
        return res.status(403).json({
          error: error.message,
          statusCode: 403,
        });
      }
      next(error);
    }
  };
};
