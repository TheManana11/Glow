import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'ahmad@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'strongPass123', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;
}
