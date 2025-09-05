import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class UpdatePasswordDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  newPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  confirmPassword: string;
}
