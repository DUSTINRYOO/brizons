import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { JwtService } from 'src/jwt/jwt.service';
import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';
import { Verification } from './entities/verification.entity';
import { UserProfileOutput } from './dtos/user-profile.dto';
import { VerifyEmailOutput } from './dtos/verify-email.dto';
import { MailService } from 'src/mail/mail.service';
import {
  GetOthersProfileInput,
  GetOthersProfileOutput,
} from './dtos/get-others-profile.dto';
import {
  GetUserProfilesInput,
  GetUserProfilesOutput,
} from './dtos/get-user-profiles.dto';
import { IsString } from 'class-validator';
import {
  DeleteAccountInput,
  DeleteAccountOutput,
} from './dtos/delete-account.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Verification)
    private readonly verifications: Repository<Verification>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async createAccount({
    username,
    email,
    password,
  }: CreateAccountInput): Promise<CreateAccountOutput> {
    try {
      const emailExists = await this.users.findOne({ where: { email } });
      const usernameExists = await this.users.findOne({ where: { username } });
      if (usernameExists) {
        return {
          ok: false,
          error: 'Username already exists.',
        };
      }
      if (emailExists) {
        return {
          ok: false,
          error: 'Email already exists.',
        };
      }
      const user = await this.users.save(
        this.users.create({ username, email, password }),
      );
      const verification = await this.verifications.save(
        this.verifications.create({
          user,
        }),
      );
      this.mailService.sendVerificationEmail(user.email, verification.code);
      return { ok: true };
    } catch (e) {
      return { ok: false, error: "Couldn't create account" };
    }
  }

  async deleteAccount(
    owner: User,
    deleteAccountInput: DeleteAccountInput,
  ): Promise<DeleteAccountOutput> {
    try {
      const username = deleteAccountInput.username;
      const user = await this.users.findOne({
        where: {
          username,
        },
      });
      if (!user) {
        return {
          ok: false,
          error: 'User not found',
        };
      }
      if (owner.username !== user.username && owner.username !== 'brizons') {
        return {
          ok: false,
          error: 'You can delete only your account',
        };
      }
      await this.users.delete({ username });
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not delete briz.',
      };
    }
  }

  async login({ username, password }: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this.users.findOne({
        where: { username },
        select: ['id', 'password'],
      });
      if (!user) {
        return {
          ok: false,
          error: 'User not found',
        };
      }
      const passwordCorrect = await user.checkPassword(password);
      if (!passwordCorrect) {
        return {
          ok: false,
          error: 'Wrong password',
        };
      }
      const token = this.jwtService.sign(user.id);
      return {
        ok: true,
        token,
      };
    } catch (error) {
      return {
        ok: false,
        error: "Can't login.",
      };
    }
  }

  async findById(id: number): Promise<UserProfileOutput> {
    try {
      const user = await this.users.findOneOrFail({ where: { id } });
      return {
        ok: true,
        user,
      };
    } catch (error) {
      return { ok: false, error: 'User Not Found' };
    }
  }

  async findByUsername(username: string): Promise<GetOthersProfileOutput> {
    try {
      const user = await this.users.findOneOrFail({ where: { username } });
      return {
        ok: true,
        user,
      };
    } catch (error) {
      return { ok: false, error: 'User Not Found' };
    }
  }

  async editProfile(
    userId: number,
    {
      username,
      password,
      email,
      name,
      biography,
      profileImg,
    }: EditProfileInput,
  ): Promise<EditProfileOutput> {
    try {
      const id = userId;
      const user = await this.users.findOne({ where: { id } });
      if (email !== user.email) {
        const emailExists = await this.users.findOne({ where: { email } });
        if (emailExists) {
          return {
            ok: false,
            error: 'Email already exists.',
          };
        }
      }
      if (username !== user.username) {
        const usernameExists = await this.users.findOne({
          where: { username },
        });
        if (usernameExists) {
          return {
            ok: false,
            error: 'Username already exists.',
          };
        }
      }
      if (email) {
        user.email = email;
        user.verified = false;
        await this.verifications.delete({ user: { id: user.id } });
        const verification = await this.verifications.save(
          this.verifications.create({ user }),
        );
        this.mailService.sendVerificationEmail(user.email, verification.code);
      }
      if (password) {
        user.password = password;
      }
      if (username) {
        user.username = username;
      }
      if (name) {
        user.name = name;
      }
      if (biography) {
        user.biography = biography;
      }
      if (profileImg) {
        user.profileImg = profileImg;
      }
      await this.users.save(user);
      return {
        ok: true,
        username: user.username,
        profileImg: user.profileImg,
      };
    } catch (error) {
      return { ok: false, error: 'Could not update profile.' };
    }
  }

  async verifyEmail(code: string): Promise<VerifyEmailOutput> {
    try {
      const verification = await this.verifications.findOne({
        where: { code },
        relations: ['user'],
      });
      if (verification) {
        verification.user.verified = true;
        await this.users.save(verification.user);
        await this.verifications.delete(verification.id);
        return { ok: true };
      }
      return { ok: false, error: 'Verification not found.' };
    } catch (error) {
      return { ok: false, error: 'Could not verify email.' };
    }
  }

  async getUserProfiles(
    authUser: User,
    getUserProfilesInput: GetUserProfilesInput,
  ): Promise<GetUserProfilesOutput> {
    try {
      const authUserId = authUser.id;
      const scrollPage = getUserProfilesInput.scrollPage;
      const userExists = await this.users.findOne({
        where: { id: authUserId },
      });
      if (!userExists) {
        return {
          ok: false,
          error: 'User not found',
        };
      }
      const MAX_USER_PER_PAGE = 18;
      const startPage = scrollPage < 1 ? 1 : scrollPage;
      const [getUserProfiles, totalUsersCount] = await this.users.findAndCount({
        skip: (startPage - 1) * MAX_USER_PER_PAGE,
        take: MAX_USER_PER_PAGE,
      });
      return {
        ok: true,
        getUserProfiles,
        totalUsersCount,
      };
    } catch {
      return { ok: false, error: 'Could not find Brizs' };
    }
  }
}
