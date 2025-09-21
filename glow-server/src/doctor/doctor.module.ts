import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { HelpersModule } from 'src/helpers/helpers.module';
import { HelpersService } from 'src/helpers/helpers.service';
import { ErrorService } from 'src/helpers/errors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { TokenService } from 'src/analysis/token.service';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor]), HelpersModule],
  controllers: [DoctorController],
  providers: [DoctorService, HelpersService, ErrorService, TokenService],
})
export class DoctorModule {}
