import { Module } from '@nestjs/common';
import { DeleteController } from './delete.controller';

@Module({
  controllers: [DeleteController],
})
export class DeleteModule {}
