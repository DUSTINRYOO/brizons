import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-account.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

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
}
