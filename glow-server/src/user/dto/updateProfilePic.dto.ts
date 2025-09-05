import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateProfileDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsNotEmpty()
  image_url: string;
}
