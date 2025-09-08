import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Index,
  Check,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../../user/entities/user.entity";
import {
  IsUUID,
  IsUrl,
  IsOptional,
  IsInt,
  Min,
  IsObject,
  IsNotEmptyObject,
} from "class-validator";

@Entity("analysis")
@Index(["user"])
@Index(["created_at"])
export class Analysis {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid", { name: "user_id" })
  user_id: string;

  @Column({ type: "text" })
  image_url: string;

  @Column({ type: "jsonb" })
  @IsObject()
  @IsNotEmptyObject()
  goals: Record<string, any>;

  @Column({ type: "jsonb" })
  @IsObject()
  @IsNotEmptyObject()
  problems: Record<string, any>;

  @Column({ type: "jsonb" })
  @IsObject()
  @IsNotEmptyObject()
  skin_care_routine: Record<string, any>;

  @Column({ type: "jsonb" })
  @IsObject()
  @IsNotEmptyObject()
  scores: Record<string, any>;

  @Column({ type: "int", nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  estimated_days_progress: number;

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.analyses, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;
}
