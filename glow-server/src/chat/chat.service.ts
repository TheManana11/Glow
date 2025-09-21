import { Injectable } from '@nestjs/common';
import { HelpersService } from 'src/helpers/helpers.service';
import { UserService } from 'src/user/user.service';
import { VectorService } from 'src/vector/vector.service';

@Injectable()
export class ChatService {

  constructor(
    private readonly helpersService: HelpersService,
    private readonly vectorService: VectorService,
    private readonly userService: UserService,
  ){}

  async chat(body: any) {
    const messageObj = body.entry[0].changes[0].value.messages?.[0];

    if (!messageObj) return null;
    const senderId = messageObj.from;
    const messageText = messageObj.text?.body;

    console.log('====================================');
    console.log(senderId);
    console.log('====================================');

    if (!messageText) return null;
    console.log('User: ', messageText);

    const response = await this.userService.findOneByNumber(`+${senderId}`);
    const userId = response.payload?.id;

    console.log('====================================');
    console.log(senderId);
    console.log('====================================');
    console.log('====================================');
    console.log(userId);
    console.log('====================================');

    const final_prompt = await this.vectorService.findMostRelevantChunks(messageText, userId || "");

    const aiResponse = await this.helpersService.call_model(final_prompt);
    console.log('Final prompt: ', final_prompt);
    console.log('Ai response: ', aiResponse);

    await this.helpersService.webhookMessage(senderId, aiResponse);
    return 'EVENT_RECEIVED';
  }
}
