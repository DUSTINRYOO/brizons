import { Module } from '@nestjs/common';
import { BrizsService } from './brizs.service';
import { BrizsResolver } from './brizs.resolver';

@Module({
  providers: [BrizsResolver, BrizsService]
})
export class BrizsModule {}
