import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BrizsService } from './brizs.service';
import { Briz } from './entities/briz.entity';
import { CreateBrizInput, CreateBrizOutput } from './dto/create-briz.dto';

import { User } from 'src/users/entities/user.entity';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { GetBrizInput, GetBrizOutput } from './dto/get-briz.dto';
import { DeleteBrizInput, DeleteBrizOutput } from './dto/delete-briz.dto';

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

  /*   @Mutation((returns) => EditBrizOutput)
  async editBriz(
    @AuthUser() authUser: User,
    @Args('editBrizInput') editBrizInput: EditBrizInput,
  ): Promise<EditBrizOutput> {
    return this.brizsService.editBriz(authUser, editBrizInput);
  } */

  @Mutation((returns) => DeleteBrizOutput)
  async deleteBriz(
    @AuthUser() authUser: User,
    @Args('deleteBrizInput') deleteBrizInput: DeleteBrizInput,
  ): Promise<DeleteBrizOutput> {
    return this.brizsService.deleteBriz(authUser, deleteBrizInput);
  }

  @Query((returns) => GetBrizOutput)
  async getBriz(
    @AuthUser() authUser: User,
    @Args('getBrizInput') getBrizInput: GetBrizInput,
  ): Promise<GetBrizOutput> {
    return this.brizsService.getBriz(authUser, getBrizInput);
  }
}
