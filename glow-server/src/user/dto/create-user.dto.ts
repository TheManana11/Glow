import { 
  IsEmail, 
  IsEnum, 
  IsNotEmpty, 
  IsNumber, 
  IsString, 
  MinLength, 
  Matches, 
  IsPhoneNumber
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { role } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({
    example: "Ahmad",
    description: "First name of the user",
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    example: "Manana",
    description: "Last name of the user",
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    example: "ahmad@example.com",
    description: "Unique email of the user",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: "strongPass123",
    minLength: 6,
    description: "Password with minimum length of 6 characters",
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 25,
    description: "Age of the user",
  })
  @IsNumber()
  @IsNotEmpty()
  age: number;

  @ApiProperty({
    enum: role,
    example: role.DOCTOR,
    description: "Role of the user, either PATIENT or DOCTOR",
  })
  @IsEnum(role)
  role: role;

  @ApiProperty({
    example: "+96171236842",
    description: "Phone number of the user in international format",
  })
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
  // @Matches(/^\+?[0-9]{8,15}$/, {
  //   message: "Phone number must be a valid international number",
  // })
  phone_number: string;
}
