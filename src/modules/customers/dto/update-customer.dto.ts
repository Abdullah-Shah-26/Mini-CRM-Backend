import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateCustomerDto {
  @IsOptional()
  @IsString({ message: "Name must be a string" })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: "Invalid email format" })
  email?: string;

  @IsOptional()
  @IsString({ message: "Phone must be a string" })
  phone?: string;

  @IsOptional()
  @IsString({ message: "Company must be a string" })
  company?: string;
}
