import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class OpenAiService {
  async getDataFromOpenAI(prompt: string) {
    try {
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
      const openAi = data.data.choices[0].text;
      console.log(prompt);
      return { openAi };
    } catch (e) {
      return null;
    }
  }
}
