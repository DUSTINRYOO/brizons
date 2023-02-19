import { Controller, Get } from '@nestjs/common';
import { OpenAiService } from './openai.service';

@Controller('openai')
export class OpenAiController {
  constructor(private readonly openAiService: OpenAiService) {}

  @Get()
  getDataFromOpenAI() {
    return this.openAiService.getDataFromOpenAI('');
  }
}
