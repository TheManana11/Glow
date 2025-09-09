import { 
  IsEmail, 
  IsEnum, 
  IsNotEmpty, 
  IsNumber, 
  IsString, 
  MinLength 
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SkinType, PrimarySkinConcern, role } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({
    example: "Ahmad",
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    example: "Manana",
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    example: "ahmad@example.com",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: "strongPass123",
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 25,
  })
  @IsNumber()
  age: number;

  @ApiProperty({
    enum: SkinType,
    example: SkinType.OILY,
  })
  @IsEnum(SkinType)
  skin_type: SkinType;

  @ApiProperty({
    enum: PrimarySkinConcern,
    example: PrimarySkinConcern.ACNE,
  })
  @IsEnum(PrimarySkinConcern)
  primary_skin_concern: PrimarySkinConcern;

  @ApiProperty({
    enum: role,
    example: role.DOCTOR,
  })
  @IsEnum(role)
  role: role;
}
