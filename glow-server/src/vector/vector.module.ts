import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VectorService } from './vector.service';
import { AnalysisChunk } from './entities/vector.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnalysisChunk]),
  ],
  providers: [VectorService],
  exports: [VectorService],
})
export class VectorModule {}
