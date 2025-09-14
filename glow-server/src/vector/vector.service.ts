import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import OpenAI from 'openai';
import { AnalysisChunk, ChunkType } from './entities/vector.entity';
import { Analysis } from 'src/analysis/entities/analysis.entity';

@Injectable()
export class VectorService {
  private openai: OpenAI;

  constructor(
    @InjectRepository(AnalysisChunk)
    private readonly chunkRepo: Repository<AnalysisChunk>,
  ) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  private async generateEmbedding(text: string) {
    const response = await this.openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });

    return response.data[0].embedding;
  }

  private joinArray(items: any, title: string): string {
    if (!items || items.length === 0) return `${title}: No data provided.`;
    return `${title}:\n` + items.map((item, index) => `${index + 1}. ${item}`).join('\n');
  }

  private joinProblems(problems: any): string {
    if (!problems || problems.length === 0) return 'No problems detected.';
    return problems
      .map(
        (p, index) =>
          `${index + 1}. ${p.title} (Severity: ${p.severity}, Confidence: ${p.confidence}%) - ${p.description}`,
      )
      .join('\n\n');
  }

  private joinRoutine(routineSteps: any[], title: string): string {
    if (!routineSteps || routineSteps.length === 0) return `${title}: No steps provided.`;

    return `${title} Routine:\n` +
      routineSteps
        .map(
          (step) =>
            `Step ${step.step}: ${step.product_name}\n` +
            `How to use: ${step.how_to_use}\n` +
            `Time: ${step.time} minutes`,
        )
        .join('\n\n');
  }

  private async saveChunk(
    analysis: Analysis,
    type: ChunkType,
    content: string,
    metadata: Record<string, any> = {},
  ) {
    const embedding = await this.generateEmbedding(content);

    const chunk = this.chunkRepo.create({
      analysis,
      type,
      content,
      embedding,
      metadata,
    });

    await this.chunkRepo.save(chunk);
  }

  async saveAnalysisChunks(analysis: Analysis) {
   
    const goalsText = this.joinArray(analysis.goals, 'User Goals');
    await this.saveChunk(analysis, ChunkType.GOAL, goalsText, {
      totalGoals: analysis.goals.length,
    });

    const problemsText = this.joinProblems(analysis.problems);
    await this.saveChunk(analysis, ChunkType.PROBLEM, problemsText, {
      totalProblems: analysis.problems.length,
    });

    const morningRoutineText = this.joinRoutine(analysis.skin_care_routine.morning, 'Morning');
    await this.saveChunk(analysis, ChunkType.ROUTINE_MORNING, morningRoutineText, {
      totalSteps: analysis.skin_care_routine.morning.length,
    });

    const eveningRoutineText = this.joinRoutine(analysis.skin_care_routine.evening, 'Evening');
    await this.saveChunk(analysis, ChunkType.ROUTINE_EVENING, eveningRoutineText, {
      totalSteps: analysis.skin_care_routine.evening.length,
    });

    const generalInfo = `
Skin Health Scores:
- Acne: ${analysis.scores.acne_score}
- Texture: ${analysis.scores.texture_score}
- Hydration: ${analysis.scores.hydration_score}
- General: ${analysis.scores.general_skin_health_score}

Estimated visible progress in ${analysis.estimated_days_progress} days.
    `.trim();

    await this.saveChunk(analysis, ChunkType.GENERAL_INFO, generalInfo, {
      estimatedDaysProgress: analysis.estimated_days_progress,
    });
  }
}
