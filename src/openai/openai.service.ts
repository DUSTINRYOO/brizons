import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class OpenAiService {
  async getDataFromOpenAI(prompt: string) {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const message = prompt;
    const data = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: message,
      temperature: 0,
      max_tokens: 150,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    return `Prompt : ${prompt} / Open AI : ${data.data.choices[0].text}`;
  }
}
