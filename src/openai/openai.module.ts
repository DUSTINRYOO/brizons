import { Module } from '@nestjs/common';
import { OpenAiController } from './openai.controller';
import { OpenAiService } from './openai.service';

@Module({
  providers: [OpenAiController, OpenAiService],
  exports: [OpenAiService],
})
export class OpenAiModule {}
