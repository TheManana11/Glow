import { Module } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { AnalysisController } from './analysis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Analysis } from './entities/analysis.entity';
import { TokenService } from './token.service';
import { User } from 'src/user/entities/user.entity';
import { HelpersModule } from 'src/helpers/helpers.module';
import { HelpersService } from 'src/helpers/helpers.service';
import { ErrorService } from 'src/helpers/errors.service';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerService } from 'src/scheduler/scheduler.service';

@Module({
  imports: [TypeOrmModule.forFeature([Analysis, User]), HelpersModule, ScheduleModule],
  controllers: [AnalysisController],
  providers: [AnalysisService, TokenService, HelpersService, ErrorService, SchedulerService],
})
export class AnalysisModule {}
