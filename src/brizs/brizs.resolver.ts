import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BrizsService } from './brizs.service';
import { Briz } from './entities/briz.entity';
import { CreateBrizInput, CreateBrizOutput } from './dto/create-briz.dto';

import { User } from 'src/users/entities/user.entity';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { GetBrizInput, GetBrizOutput } from './dto/get-briz.dto';

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

  @Query((returns) => GetBrizOutput)
  async getBriz(
    @AuthUser() authUser: User,
    @Args('getBrizInput') getBrizInput: GetBrizInput,
  ): Promise<GetBrizOutput> {
    return this.brizsService.getBriz(authUser, getBrizInput);
  }
}
