import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('webhook')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  verify(
    @Query('hub.mode') mode: string,
    @Query('hub.verify_token') token: string,
    @Query('hub.challenge') challenge: string,
  ) {
    const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      return challenge;
    }
    return 'Error: tokens do not match';
  }

  @Post()
  async receive(@Body() body: any) {
    try {
      const response = this.chatService.chat(body);
      return { response };
    } catch (error) {
      return { message: 'Error', Error: error.message };
    }
  }
}
