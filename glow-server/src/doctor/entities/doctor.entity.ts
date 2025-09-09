import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  RelationId,
} from "typeorm";
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Max,
  Min,
  Length,
} from "class-validator";
import { User } from "src/user/entities/user.entity";

export enum DermatologySpecialty {
  GENERAL_DERMATOLOGY = "general_dermatology",
  COSMETIC_DERMATOLOGY = "cosmetic_dermatology",
  PEDIATRIC_DERMATOLOGY = "pediatric_dermatology",
  DERMATOPATHOLOGY = "dermatopathology",
  MOHS_SURGERY = "mohs_surgery",
  TRICHOLOGY = "trichology",
  AESTHETIC_DERMATOLOGY = "aesthetic_dermatology",
  IMMUNODERMATOLOGY = "immunodermatology",
  ALLERGY_CONTACT_DERMATITIS = "allergy_contact_dermatitis",
}

export enum DoctorAvailability {
  TODAY = "today",
  TOMORROW = "tomorrow",
  MONDAY = "monday",
  TUESDAY = "tuesday",
  WEDNESDAY = "wednesday",
  THURSDAY = "thursday",
  FRIDAY = "friday",
}

@Entity("doctors")
export class Doctor {
  @PrimaryGeneratedColumn("uuid")
  id: string;


  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' }) 
  user: User;

  @RelationId((doctor: Doctor) => doctor.user)
  user_id: string;

  @Column({
    type: "enum",
    enum: DermatologySpecialty,
  })
  @IsEnum(DermatologySpecialty)
  specialty: DermatologySpecialty;

  @Column({ type: "int" })
  @IsInt()
  @Min(0)
  @Max(60)
  years_experience: number;

  @Column({
    type: "enum",
    enum: DoctorAvailability,
    default: DoctorAvailability.TODAY,
  })
  @IsEnum(DoctorAvailability)
  availability: DoctorAvailability;

  @Column({ type: "numeric", precision: 10, scale: 2 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price_per_session: number;

  @Column({ type: "varchar", length: 200 })
  @IsString()
  @IsNotEmpty()
  @Length(2, 200)
  location: string;

  @Column({ type: "text" })
  national_id_image_url: string;

  @Column({ type: "text" })
  medical_license_image_url: string;

  @Column({ type: "boolean", default: false })
  @IsBoolean()
  verified: boolean;

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updated_at: Date;
}
