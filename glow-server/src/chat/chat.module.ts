import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { HelpersModule } from 'src/helpers/helpers.module';
import { HelpersService } from 'src/helpers/helpers.service';

@Module({
  imports: [HelpersModule],
  controllers: [ChatController],
  providers: [ChatService, HelpersService],
})
export class ChatModule {}
