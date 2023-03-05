import { Module } from '@nestjs/common';
import { BrizsService } from './brizs.service';
import { BrizsResolver } from './brizs.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Briz } from './entities/briz.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Briz])],
  providers: [BrizsResolver, BrizsService],
})
export class BrizsModule {}
