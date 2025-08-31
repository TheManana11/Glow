import { Injectable } from '@nestjs/common';
import { call_gemini } from 'src/helpers/gemini_ai';
import { call_model } from 'src/helpers/call_model';
import { webhookMessage } from 'src/helpers/webhookMessageSent.helper';

@Injectable()
export class ChatService {
  async chat(body: any) {
    const messageObj = body.entry[0].changes[0].value.messages?.[0];

    if (!messageObj) return null;
    const senderId = messageObj.from;
    const messageText = messageObj.text?.body;

    if (!messageText) return null;
    console.log('User: ', messageText);

    const aiResponse = await call_model(messageText);
    console.log('Ai response: ', aiResponse);

    await webhookMessage(senderId, aiResponse);
    return 'EVENT_RECEIVED';
  }
}
