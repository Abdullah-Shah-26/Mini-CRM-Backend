import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export enum TaskStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export class CreateTaskDto {
  @IsNotEmpty({ message: "Title is required" })
  @IsString({ message: "Title must be a string" })
  title!: string;

  @IsOptional()
  @IsString({ message: "Description must be a string" })
  description?: string;

  @IsNotEmpty({ message: "AssignedTo is required" })
  @IsInt({ message: "AssignedTo must be an integer" })
  assignedTo!: number;

  @IsNotEmpty({ message: "CustomerId is required" })
  @IsInt({ message: "CustomerId must be an integer" })
  customerId!: number;

  @IsOptional()
  @IsEnum(TaskStatus, {
    message: "Status must be PENDING, IN_PROGRESS, or DONE",
  })
  status?: TaskStatus;
}
