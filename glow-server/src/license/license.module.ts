import { Module } from '@nestjs/common';
import { LicenseService } from './license.service';
import { LicenseController } from './license.controller';
import { License } from './entities/license.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([License])],
  controllers: [LicenseController],
  providers: [LicenseService],
})
export class LicenseModule {}
