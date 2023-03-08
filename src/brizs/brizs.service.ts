import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { retry } from 'rxjs';
import { User } from 'src/users/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateBrizInput, CreateBrizOutput } from './dto/create-briz.dto';
import { GetBrizInput, GetBrizOutput } from './dto/get-briz.dto';

import { Briz } from './entities/briz.entity';
import { Grid } from './entities/grid.entity';

@Injectable()
export class BrizsService {
  constructor(
    @InjectRepository(Briz)
    private readonly briz: Repository<Briz>,
    @InjectRepository(Grid)
    private readonly grid: Repository<Grid>,
  ) {}

  async createBriz(
    owner: User,
    createBrizInput: CreateBrizInput,
  ): Promise<CreateBrizOutput> {
    try {
      if (!createBrizInput.parentBrizId) {
        const newBriz = this.briz.create(createBrizInput);
        const newGrid = this.grid.create(createBrizInput.grid);
        const savedGrid = await this.grid.save(newGrid);
        console.log(savedGrid);
        newBriz.owner = owner;
        newBriz.grid = savedGrid;
        await this.briz.save(newBriz);
        return {
          ok: true,
        };
      }
      const id = createBrizInput.parentBrizId;
      const parentBriz = await this.briz.findOne({ where: { id } });
      const newBriz = this.briz.create(createBrizInput);
      const newGrid = this.grid.create(createBrizInput.grid);
      newBriz.owner = owner;
      newBriz.parent = parentBriz;
      newBriz.grid = newGrid;
      await this.briz.save(newBriz);
      await this.grid.save(newGrid);
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

  async getBriz(
    owner: User,
    getBrizInput: GetBrizInput,
  ): Promise<GetBrizOutput> {
    try {
      const ownerId = owner.id;
      const parentId = getBrizInput.parentId;
      console.log(ownerId, parentId);
      const getBriz = await this.briz.find({
        relations: { owner: true, grid: true },
        where: {
          owner: {
            id: ownerId,
          },
          parent: {
            id: parentId,
          },
        },
      });
      return {
        ok: true,
        getBriz,
      };
    } catch {
      return { ok: false, error: 'Could not find Brizs' };
    }
  }
}
