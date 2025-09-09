import { Analysis } from "src/analysis/entities/analysis.entity";
import { Doctor } from "src/doctor/entities/doctor.entity";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne } from "typeorm";

export enum SkinType {
  OILY = 'oily',
  DRY = 'dry',
  COMBINATION = 'combination',
  NORMAL = 'normal',
  SENSITIVE = 'sensitive',
}

export enum role {
  PATIENT = 'patient',
  DOCTOR = 'doctor',
}

export enum PrimarySkinConcern {
  ACNE = 'acne',
  WRINKLES = 'wrinkles',
  DARK_SPOTS = 'dark_spots',
  REDNESS = 'redness',
  OTHER = 'other',
}

@Entity('users') 
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  first_name: string;

  @Column({ length: 100 })
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'int' })
  age: number;

  @Column({
    type: 'enum',
    enum: SkinType,
  })
  skin_type: SkinType;

  @Column({
    type: 'enum',
    enum: PrimarySkinConcern,
  })
  primary_skin_concern: PrimarySkinConcern;

  @Column({ nullable: true })
  image_url: string;
 
  @Column({
    type: 'enum',
    enum: role,
    default: role.PATIENT
  })
  role: role;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => Analysis, (analysis) => analysis.user, {})
  analyses: Analysis[];

  @OneToOne(() => Doctor, (doctor) => doctor.user)
  doctor: Doctor;
}
