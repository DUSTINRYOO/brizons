import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateBrizInput, CreateBrizOutput } from './dto/create-briz.dto';

import { Briz } from './entities/briz.entity';

@Injectable()
export class BrizsService {
  constructor(
    @InjectRepository(Briz)
    private readonly briz: Repository<Briz>,
  ) {}

  async createBriz(
    owner: User,
    createBrizInput: CreateBrizInput,
  ): Promise<CreateBrizOutput> {
    try {
      if (!createBrizInput.parentBrizId) {
        const newBriz = this.briz.create(createBrizInput);
        newBriz.owner = owner;
        await this.briz.save(newBriz);
        return {
          ok: true,
        };
      }
      const id = createBrizInput.parentBrizId;
      const parentBriz = await this.briz.findOne({ where: { id } });
      const newBriz = this.briz.create(createBrizInput);
      newBriz.owner = owner;
      newBriz.parent = parentBriz;
      await this.briz.save(newBriz);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not create briz',
      };
    }
  }
}
