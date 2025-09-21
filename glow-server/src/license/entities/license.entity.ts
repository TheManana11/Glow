import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('licenses')
export class License {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  license_number: string; 
}
