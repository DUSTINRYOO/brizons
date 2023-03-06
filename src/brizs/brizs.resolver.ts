import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BrizsService } from './brizs.service';
import { Briz } from './entities/briz.entity';
import { CreateBrizInput, CreateBrizOutput } from './dto/create-briz.dto';

import { User } from 'src/users/entities/user.entity';
import { AuthUser } from 'src/auth/auth-user.decorator';

@Resolver((of) => Briz)
export class BrizsResolver {
  constructor(private readonly brizsService: BrizsService) {}

  @Mutation((returns) => CreateBrizOutput)
  async createBriz(
    @AuthUser() authUser: User,
    @Args('createBrizInput') createBrizInput: CreateBrizInput,
  ): Promise<CreateBrizOutput> {
    return this.brizsService.createBriz(authUser, createBrizInput);
  }
}
