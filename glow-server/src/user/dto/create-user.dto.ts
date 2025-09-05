import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { SkinType, PrimarySkinConcern } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsNumber()
  age: number;

  @IsEnum(SkinType)
  skin_type: SkinType;

  @IsEnum(PrimarySkinConcern)
  primary_skin_concern: PrimarySkinConcern
}
