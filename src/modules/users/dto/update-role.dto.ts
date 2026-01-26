import { IsEnum, IsNotEmpty } from "class-validator";

export enum Role {
  ADMIN = "ADMIN",
  EMPLOYEE = "EMPLOYEE",
}

export class UpdateRoleDto {
  @IsNotEmpty({ message: "Role is required" })
  @IsEnum(Role, { message: "Role must be either ADMIN or EMPLOYEE" })
  role!: Role;
}
