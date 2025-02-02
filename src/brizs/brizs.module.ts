import { Module } from '@nestjs/common';
import { BrizsService } from './brizs.service';
import { BrizsResolver } from './brizs.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Briz } from './entities/briz.entity';
import { Grid } from './entities/grid.entity';
import { Text } from './entities/text.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Briz, Grid, Text])],
  providers: [BrizsResolver, BrizsService],
  exports: [BrizsService],
})
export class BrizsModule {}
