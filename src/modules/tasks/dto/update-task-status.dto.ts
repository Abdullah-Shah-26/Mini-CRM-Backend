import { IsEnum, IsNotEmpty } from "class-validator";

export enum TaskStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export class UpdateTaskStatusDto {
  @IsNotEmpty({ message: "Status is required" })
  @IsEnum(TaskStatus, {
    message: "Status must be PENDING, IN_PROGRESS, or DONE",
  })
  status!: TaskStatus;
}
