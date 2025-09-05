// import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// @Entity('users') // explicitly name the table
// export class User {
//     @PrimaryGeneratedColumn()
//     id: number; // numeric ID

//     @Column()
//     first_name: string;

//     @Column()
//     last_name: string;

//     @Column({ unique: true })
//     email: string;

//     @Column()
//     password: string;

//     @Column()
//     age: number;
// }

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;
}
