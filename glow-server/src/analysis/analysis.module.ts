import { Module } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { AnalysisController } from './analysis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Analysis } from './entities/analysis.entity';
import { TokenService } from './token.service';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Analysis, User])],
  controllers: [AnalysisController],
  providers: [AnalysisService, TokenService],
})
export class AnalysisModule {}
