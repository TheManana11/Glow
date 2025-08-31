import axios from 'axios';

export async function call_Model(text: string) {
  try {
    const response = await axios.post(
      'https://router.huggingface.co/v1/chat/completions',
      {
        messages: [
          {
            role: 'user',
            content: text,
          },
        ],
        model: 'Qwen/Qwen2.5-7B-Instruct:together',
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MODEL_TOKEN}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const output = response.data.choices[0].message.content || 'No response from model';
    return output;
  } catch (error: any) {
    console.error(
      'Error calling model:',
      error.response?.data.message || error.message,
    );
  }
}
