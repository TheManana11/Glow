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
    private readonly vectorRepository: Repository<AnalysisChunk>,
  ) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }



  // ************************** Emediing data and save into db ********************************************

  private async generateEmbedding(text: string): Promise<number[]> {
    const response = await this.openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });
    return response.data[0].embedding;
  }

  
  private formatList(items: any, title: string): string {
    if (!items || items.length === 0) return `${title}: No data provided.`;
    return `${title}:\n${items.map((item, i) => `${i + 1}. ${item}`).join('\n')}`;
  }

  private formatProblems(problems: any): string {
    if (!problems || problems.length === 0) return 'No problems detected.';
    return problems
      .map(
        (p, i) =>
          `${i + 1}. ${p.title} (Severity: ${p.severity}, Confidence: ${p.confidence}%)\nDescription: ${p.description}`,
      )
      .join('\n\n');
  }

  private formatRoutine(routineSteps: any[], title: string): string {
    if (!routineSteps || routineSteps.length === 0) return `${title}: No steps provided.`;
    return `${title} Routine:\n${routineSteps
      .map(
        (step) =>
          `Step ${step.step}: ${step.product_name}\n` +
          `How to use: ${step.how_to_use}\n` +
          `Time: ${step.time} minutes`,
      )
      .join('\n\n')}`;
  }

  private async saveChunk(analysis: Analysis, type: ChunkType, chunkContent: string) {
    const embedding = await this.generateEmbedding(chunkContent);

    const chunk = this.vectorRepository.create({
      userId: analysis.user.id,
      analysisId: analysis.id,
      type,
      content: chunkContent,
      embedding,
    });

    return this.vectorRepository.save(chunk);
  }

 
  async saveAnalysisChunks(analysis: Analysis) {

    const goalsText = this.formatList(analysis.goals, 'User Goals');
    await this.saveChunk(analysis, ChunkType.GOAL, goalsText);

    
    const problemsText = this.formatProblems(analysis.problems);
    await this.saveChunk(analysis, ChunkType.PROBLEM, problemsText);

    
    const morningText = this.formatRoutine(analysis.skin_care_routine.morning, 'Morning');
    await this.saveChunk(analysis, ChunkType.ROUTINE_MORNING, morningText);

    
    const eveningText = this.formatRoutine(analysis.skin_care_routine.evening, 'Evening');
    await this.saveChunk(analysis, ChunkType.ROUTINE_EVENING, eveningText);

    
    const generalInfo = `
        Skin Health Scores:
        - Acne: ${analysis.scores.acne_score}
        - Texture: ${analysis.scores.texture_score}
        - Hydration: ${analysis.scores.hydration_score}
        - General: ${analysis.scores.general_skin_health_score}

        Estimated visible progress in ${analysis.estimated_days_progress} days.
            `.trim();

    await this.saveChunk(analysis, ChunkType.SCORES, generalInfo);
  }







  // *************************   QUERY   ***************************************************


  private cosineSimilarity(vecA: number[], vecB: number[]): number {
    const dotProduct = vecA.reduce((sum, a, idx) => sum + a * vecB[idx], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
    return dotProduct / (magnitudeA * magnitudeB);
  }

  async findMostRelevantChunks(prompt: string, user_id: string) {
    const promptEmbedding = await this.generateEmbedding(prompt);
    
    const allChunks = await this.vectorRepository.find({
      where: { userId: user_id },
    });


    if (allChunks.length === 0) {
      return { prompt, relevantChunks: [] };
    }

    const similarities = allChunks.map(chunk => ({
      chunk,
      similarity: this.cosineSimilarity(promptEmbedding, chunk.embedding),
    }));

    const top3 = similarities
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 3)
      .map(result => result.chunk);

    return {
      relevantChunks: top3.map(c => ({
        type: c.type,
        content: c.content,
        date: c.createdAt.toLocaleDateString('en-GB'),
      })),
      prompt
    };
  }
}
