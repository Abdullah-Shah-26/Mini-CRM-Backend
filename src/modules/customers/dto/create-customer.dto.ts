import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCustomerDto {
  @IsNotEmpty({ message: "Name is required" })
  @IsString({ message: "Name must be a string" })
  name!: string;

  @IsNotEmpty({ message: "Email is required" })
  @IsEmail({}, { message: "Invalid email format" })
  email!: string;

  @IsNotEmpty({ message: "Phone is required" })
  @IsString({ message: "Phone must be a string" })
  phone!: string;

  @IsOptional()
  @IsString({ message: "Company must be a string" })
  company?: string;
}
