import axios from 'axios';
import { isEmpty } from 'rxjs';

export async function webhookMessage(senderId: string, text: string) {

  if( text === ''){
    text = 'No response from AI';
  }
    const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
    const TOKEN = process.env.TOKEN;
    await axios.post(
      `https://graph.facebook.com/v17.0/${PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: 'whatsapp',
        to: senderId,
        text: { body: text },
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Content-Type': 'application/json',
        },
      },
    );
  }