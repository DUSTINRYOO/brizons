import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BrizsService } from './brizs.service';
import { Briz } from './entities/briz.entity';
import { CreateBrizInput, CreateBrizOutput } from './dto/create-briz.dto';

import { User } from 'src/users/entities/user.entity';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { GetBrizInput, GetBrizOutput } from './dto/get-briz.dto';
import { DeleteBrizInput, DeleteBrizOutput } from './dto/delete-briz.dto';
import { EditBrizInput, EditBrizOutput } from './dto/edit-briz.dto';
import {
  GetPinnedBrizInput,
  GetPinnedBrizOutput,
} from './dto/get-pinned-briz.dto';
import {
  GetParentBrizInput,
  GetParentBrizOutput,
} from './dto/get-parent-briz.dto';
import {
  GetInBucketBrizInput,
  GetInBucketBrizOutput,
} from './dto/get-inbucket-briz.dto';
import {
  GetRecentBrizInput,
  GetRecentBrizOutput,
} from './dto/get-recent-briz.dto';

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

  @Mutation((returns) => EditBrizOutput)
  async editBriz(
    @AuthUser() authUser: User,
    @Args('editBrizInput') editBrizInput: EditBrizInput,
  ): Promise<EditBrizOutput> {
    return this.brizsService.editBriz(authUser, editBrizInput);
  }

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

  @Query((returns) => GetInBucketBrizOutput)
  async getInBucketBriz(
    @AuthUser() authUser: User,
    @Args('getInBucketBrizInput') getInBucketBrizInput: GetInBucketBrizInput,
  ): Promise<GetInBucketBrizOutput> {
    return this.brizsService.getInBucketBriz(authUser, getInBucketBrizInput);
  }

  @Query((returns) => GetParentBrizOutput)
  async getParentBriz(
    @AuthUser() authUser: User,
    @Args('getParentBrizInput') getParentBrizInput: GetParentBrizInput,
  ): Promise<GetParentBrizOutput> {
    return this.brizsService.getParentBriz(authUser, getParentBrizInput);
  }

  @Query((returns) => GetPinnedBrizOutput)
  async getPinnedBriz(
    @AuthUser() authUser: User,
    @Args('getPinnedBrizInput') getPinnedBrizInput: GetPinnedBrizInput,
  ): Promise<GetPinnedBrizOutput> {
    return this.brizsService.getPinnedBriz(authUser, getPinnedBrizInput);
  }

  @Query((returns) => GetRecentBrizOutput)
  async getRecentBriz(
    @AuthUser() authUser: User,
    @Args('getRecentBrizInput') getRecentBrizInput: GetRecentBrizInput,
  ): Promise<GetRecentBrizOutput> {
    return this.brizsService.getRecentBriz(authUser, getRecentBrizInput);
  }
}
