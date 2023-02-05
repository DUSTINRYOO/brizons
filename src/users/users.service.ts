import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { JwtService } from 'src/jwt/jwt.service';
import { EditProfileInput } from './dtos/edit-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    console.log(this.config.get('SECRET_KEY'));
  }

  async createAccount({
    username,
    email,
    password,
  }: CreateAccountInput): Promise<{ ok: boolean; error?: string }> {
    try {
      const emailExists = await this.users.findOne({ where: { email } });
      const usernameExists = await this.users.findOne({ where: { username } });
      if (emailExists || usernameExists) {
        return {
          ok: false,
          error: 'There is a user with that username or email already',
        };
      }
      await this.users.save(this.users.create({ username, password, email }));
      return { ok: true };
    } catch (e) {
      return { ok: false, error: "Couldn't create account" };
    }
  }

  async login({
    username,
    password,
  }: LoginInput): Promise<{ ok: boolean; error?: string; token?: string }> {
    // make a JWT and give it to the user
    try {
      const user = await this.users.findOne({ where: { username } });
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
        error,
      };
    }
  }
  async findById(id: number): Promise<User> {
    return this.users.findOne({ where: { id } });
  }
  async editProfile(
    userId: number,
    { username, password, email }: EditProfileInput,
  ): Promise<User> {
    const id = userId;
    const user = await this.users.findOne({ where: { id } });
    if (username) {
      user.username = username;
    }
    if (password) {
      user.password = password;
    }
    if (email) {
      user.email = email;
    }
    return this.users.save(user);
  }
}
