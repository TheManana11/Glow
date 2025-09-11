import { Analysis } from "src/analysis/entities/analysis.entity";
import { Doctor } from "src/doctor/entities/doctor.entity";
import { 
  Column, 
  Entity, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn, 
  OneToMany, 
  OneToOne 
} from "typeorm";

export enum role {
  PATIENT = 'patient',
  DOCTOR = 'doctor',
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

  @Column({ nullable: true })
  image_url: string;

  @Column({
    type: 'enum',
    enum: role,
    default: role.PATIENT
  })
  role: role;

  @Column({
    type: 'varchar',
    length: 20,
    default: '+96171236842'
  })
  phone_number: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => Analysis, (analysis) => analysis.user, {})
  analyses: Analysis[];

  @OneToOne(() => Doctor, (doctor) => doctor.user)
  doctor: Doctor;
}
