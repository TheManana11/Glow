import { Injectable } from '@nestjs/common';
import { HelpersService } from 'src/helpers/helpers.service';

@Injectable()
export class ChatService {

  constructor(private readonly helpersService: HelpersService){}

  async chat(body: any) {
    const messageObj = body.entry[0].changes[0].value.messages?.[0];

    if (!messageObj) return null;
    const senderId = messageObj.from;
    const messageText = messageObj.text?.body;

    if (!messageText) return null;
    console.log('User: ', messageText);

    const aiResponse = await this.helpersService.call_model(messageText);
    console.log('Ai response: ', aiResponse);

    await this.helpersService.webhookMessage(senderId, aiResponse);
    return 'EVENT_RECEIVED';
  }
}
