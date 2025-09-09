// src/doctor/dto/create-doctor.dto.ts
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  DermatologySpecialty,
  DoctorAvailability,
} from '../../doctor/entities/doctor.entity';

export class CreateDoctorDto {
  @ApiProperty({
    description: 'Medical specialty (dermatology subspecialty)',
    enum: DermatologySpecialty,
    enumName: 'DermatologySpecialty',
    example: DermatologySpecialty.COSMETIC_DERMATOLOGY,
  })
  @IsEnum(DermatologySpecialty)
  specialty: DermatologySpecialty;

  @ApiProperty({
    description: 'Years of professional experience (0–60)',
    minimum: 0,
    maximum: 60,
    example: 7,
  })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(60)
  years_experience: number;

  @ApiPropertyOptional({
    description: 'Doctor’s earliest availability',
    enum: DoctorAvailability,
    enumName: 'DoctorAvailability',
    example: DoctorAvailability.THURSDAY,
  })
  @IsOptional()
  @IsEnum(DoctorAvailability)
  availability?: DoctorAvailability;

  @ApiProperty({
    description: 'Price per session (2 decimal places)',
    minimum: 0,
    example: 45.5,
  })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price_per_session: number;

  @ApiProperty({
    description: 'City/clinic address or general location',
    minLength: 2,
    maxLength: 200,
    example: 'Beirut City Center, Clinic 203',
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 200)
  location: string;

  @ApiProperty({
    description: 'URL to national ID image',
    example: 'https://cdn.example.com/docs/national-id-123.jpg',
  })
  @IsString()
  @IsNotEmpty()
  national_id_image_url: string;

  @ApiProperty({
    description: 'URL to medical license image',
    example: 'https://cdn.example.com/docs/license-123.jpg',
  })
  @IsString()
  @IsNotEmpty()
  medical_license_image_url: string;

  @ApiPropertyOptional({
    description: 'Verification flag (usually set by admins)',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  verified?: boolean;
}
