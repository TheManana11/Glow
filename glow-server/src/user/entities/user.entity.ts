import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

export enum SkinType {
  OILY = 'oily',
  DRY = 'dry',
  COMBINATION = 'combination',
  NORMAL = 'normal',
  SENSITIVE = 'sensitive',
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

  @Column()
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

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
