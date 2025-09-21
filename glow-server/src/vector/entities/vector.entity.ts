import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export enum ChunkType {
  GOAL = 'goal',
  PROBLEM = 'problem',
  ROUTINE_MORNING = 'routine_morning',
  ROUTINE_EVENING = 'routine_evening',
  SCORES = 'scores',
}

@Entity('analysis_chunks')
export class AnalysisChunk {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column()
  analysisId: string;

  @Index()
  @Column()
  userId: string;


  @Column({ type: 'enum', enum: ChunkType })
  type: ChunkType;

  @Column({ type: 'text' })
  content: string;

  @Column('float8', { array: true })
  embedding: number[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
