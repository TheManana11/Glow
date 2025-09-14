import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Analysis } from 'src/analysis/entities/analysis.entity';

export enum ChunkType {
  GOAL = 'goal',
  PROBLEM = 'problem',
  ROUTINE_MORNING = 'routine_morning',
  ROUTINE_EVENING = 'routine_evening',
  GENERAL_INFO = 'general_info',
}

@Entity('analysis_chunks')
export class AnalysisChunk {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Link each chunk back to its parent analysis
  @ManyToOne(() => Analysis, (analysis) => analysis.chunks, { onDelete: 'CASCADE' })
  analysis: Analysis;

  // Classify the type of chunk (goal, problem, etc.)
  @Column({ type: 'enum', enum: ChunkType })
  type: ChunkType;

  // The actual text chunk that will be embedded
  @Column({ type: 'text' })
  content: string;

  // The vector representation of the chunk
@Column({ type: 'real_vector', length: 1536 })
  embedding: number[];

  // Optional metadata for context
  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
