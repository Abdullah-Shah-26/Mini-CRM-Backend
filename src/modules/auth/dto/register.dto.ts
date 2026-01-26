import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from "class-validator";

export enum Role {
  ADMIN = "ADMIN",
  EMPLOYEE = "EMPLOYEE",
}

export class RegisterDto {
  @IsNotEmpty({ message: "Name is required" })
  @IsString({ message: "Name must be a string" })
  name!: string;

  @IsNotEmpty({ message: "Email is required" })
  @IsEmail({}, { message: "Invalid email format" })
  email!: string;

  @IsNotEmpty({ message: "Password is required" })
  @IsString({ message: "Password must be a string" })
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  password!: string;

  @IsNotEmpty({ message: "Role is required" })
  @IsEnum(Role, { message: "Role must be either ADMIN or EMPLOYEE" })
  role!: Role;
}
