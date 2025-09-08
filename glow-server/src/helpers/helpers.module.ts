import { Module } from '@nestjs/common';
import { HelpersService } from './helpers.service';
import { ErrorService } from './errors.service';

@Module({
  providers: [HelpersService, ErrorService],
  exports: [HelpersService, ErrorService]
})
export class HelpersModule {}
