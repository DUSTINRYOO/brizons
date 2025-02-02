import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import {
  DeleteAccountInput,
  DeleteAccountOutput,
} from './dtos/delete-account.dto';
import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';
import {
  GetOthersProfileInput,
  GetOthersProfileOutput,
} from './dtos/get-others-profile.dto';
import {
  GetUserProfilesInput,
  GetUserProfilesOutput,
} from './dtos/get-user-profiles.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { UserProfileInput, UserProfileOutput } from './dtos/user-profile.dto';
import { VerifyEmailInput, VerifyEmailOutput } from './dtos/verify-email.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation((returns) => CreateAccountOutput)
  async createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    return this.usersService.createAccount(createAccountInput);
  }

  @UseGuards(AuthGuard)
  @Mutation((returns) => DeleteAccountOutput)
  async deleteAccount(
    @AuthUser() authUser: User,
    @Args('deleteAccountInput') deleteAccountInput: DeleteAccountInput,
  ): Promise<DeleteAccountOutput> {
    return this.usersService.deleteAccount(authUser, deleteAccountInput);
  }

  @Mutation((returns) => LoginOutput)
  async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    return this.usersService.login(loginInput);
  }

  @Query((returns) => User)
  @UseGuards(AuthGuard)
  me(@AuthUser() authUser: User) {
    return authUser;
  }

  @UseGuards(AuthGuard)
  @Query((returns) => UserProfileOutput)
  async userProfile(
    @Args() userProfileInput: UserProfileInput,
  ): Promise<UserProfileOutput> {
    return this.usersService.findById(userProfileInput.userId);
  }

  @UseGuards(AuthGuard)
  @Query((returns) => GetOthersProfileOutput)
  async getOthersProfile(
    @Args('getOthersProfileInput') getOthersProfileInput: GetOthersProfileInput,
  ): Promise<GetOthersProfileOutput> {
    return this.usersService.findByUsername(getOthersProfileInput.username);
  }

  @UseGuards(AuthGuard)
  @Mutation((returns) => EditProfileOutput)
  async editProfile(
    @AuthUser() authUser: User,
    @Args('editProfileInput') editProfileInput: EditProfileInput,
  ): Promise<EditProfileOutput> {
    return this.usersService.editProfile(authUser.id, editProfileInput);
  }

  @Mutation((returns) => VerifyEmailOutput)
  verifyEmail(@Args('input') { code }: VerifyEmailInput) {
    return this.usersService.verifyEmail(code);
  }

  @Query((returns) => GetUserProfilesOutput)
  async getUserProfiles(
    @AuthUser() authUser: User,
    @Args('getUserProfilesInput') getUserProfilesInput: GetUserProfilesInput,
  ): Promise<GetUserProfilesOutput> {
    return this.usersService.getUserProfiles(authUser, getUserProfilesInput);
  }
}
