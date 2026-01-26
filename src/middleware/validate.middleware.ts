import { Request, Response, NextFunction } from "express";
import {
  validate,
  ValidationError as ClassValidationError,
} from "class-validator";
import { plainToClass } from "class-transformer";

export const validateDto = (dtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Transform plain object to DTO class instance
      const dtoInstance = plainToClass(dtoClass, req.body);

      // Validate
      const errors = await validate(dtoInstance);

      if (errors.length > 0) {
        // Format validation errors
        const formattedErrors = errors.map((error) => {
          return Object.values(error.constraints || {}).join(", ");
        });

        return res.status(400).json({
          error: "Validation failed",
          statusCode: 400,
          details: formattedErrors,
        });
      }

      // Replace req.body with validated DTO instance
      req.body = dtoInstance;

      next();
    } catch (error) {
      next(error);
    }
  };
};
