import { Module } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { AnalysisController } from './analysis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Analysis } from './entities/analysis.entity';
import { TokenService } from './token.service';
import { User } from 'src/user/entities/user.entity';
import { HelpersModule } from 'src/helpers/helpers.module';
import { HelpersService } from 'src/helpers/helpers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Analysis, User]), HelpersModule],
  controllers: [AnalysisController],
  providers: [AnalysisService, TokenService, HelpersService],
})
export class AnalysisModule {}
