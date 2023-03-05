import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Briz } from 'src/brizs/entities/briz.entity';
import { User } from './entities/user.entity';
import { Verification } from './entities/verification.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Verification, Briz])],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
