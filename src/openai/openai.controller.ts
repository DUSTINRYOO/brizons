import { Body, Controller, Get, Post } from '@nestjs/common';
import { OpenAiService } from './openai.service';
import { Configuration, OpenAIApi } from 'openai';

interface OpenAiInput {
  prompt: string;
}

@Controller('openai')
export class OpenAiController {
  @Post('')
  async getDataFromOpenAI(@Body() data: OpenAiInput) {
    const { prompt } = data;
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
      return { openAi };
    } catch (e) {
      return null;
    }
  }
}
