import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { HelpersModule } from 'src/helpers/helpers.module';
import { HelpersService } from 'src/helpers/helpers.service';
import { UserModule } from 'src/user/user.module';
import { AnalysisModule } from 'src/analysis/analysis.module';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Analysis } from 'src/analysis/entities/analysis.entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Analysis]), HelpersModule, UserModule, AnalysisModule],
  providers: [SchedulerService, HelpersService, UserService],
  exports: [SchedulerService]
})
export class SchedulerModule {}
