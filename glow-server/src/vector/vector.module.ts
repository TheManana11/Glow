import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VectorService } from './vector.service';
import { AnalysisChunk } from './entities/vector.entity';
import { HelpersModule } from 'src/helpers/helpers.module';
import { HelpersService } from 'src/helpers/helpers.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnalysisChunk]), HelpersModule
  ],
  providers: [VectorService, HelpersService],
  exports: [VectorService, TypeOrmModule],
})
export class VectorModule {}
