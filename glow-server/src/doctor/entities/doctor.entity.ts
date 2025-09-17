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
  GENERAL_DERMATOLOGY = "General Dermatology",
  COSMETIC_DERMATOLOGY = "Cosmetic Dermatology",
  PEDIATRIC_DERMATOLOGY = "Pediatric Dermatology",
  DERMATOPATHOLOGY = "Dermatopathology",
  MOHS_SURGERY = "Mohs Surgery",
  TRICHOLOGY = "Trichology",
  AESTHETIC_DERMATOLOGY = "Aesthetic Dermatology",
  IMMUNODERMATOLOGY = "Immunodermatology",
  ALLERGY_CONTACT_DERMATITIS = "Allergy Contact Dermatitis",
}

@Entity("doctors")
export class Doctor {
  @PrimaryGeneratedColumn("uuid")
  id: string;


  @OneToOne(() => User, (user) => user.doctor, { onDelete: "CASCADE", eager: false })
  @JoinColumn({ name: "user_id" })
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
    type: "varchar",
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 200)
  availability: string;

  @Column({ type: "numeric", precision: 10, scale: 2 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price_per_session: number;

  @Column({ type: "varchar", length: 200 })
  @IsString()
  @IsNotEmpty()
  @Length(2, 200)
  location: string;

  @Column({ type: "varchar" })
  medical_license_number: string;

  @Column({ type: "boolean", default: false })
  @IsBoolean()
  verified: boolean;

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updated_at: Date;
}
