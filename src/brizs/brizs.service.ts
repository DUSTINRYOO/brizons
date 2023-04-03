import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from 'src/users/entities/user.entity';
import { IsNull, Repository } from 'typeorm';
import { CreateBrizInput, CreateBrizOutput } from './dto/create-briz.dto';
import { DeleteBrizInput, DeleteBrizOutput } from './dto/delete-briz.dto';
import { EditBrizInput, EditBrizOutput } from './dto/edit-briz.dto';
import { GetBrizInput, GetBrizOutput } from './dto/get-briz.dto';
import {
  GetInBucketBrizInput,
  GetInBucketBrizOutput,
} from './dto/get-inbucket-briz.dto';
import {
  GetParentBrizInput,
  GetParentBrizOutput,
} from './dto/get-parent-briz.dto';
import {
  GetPinnedBrizInput,
  GetPinnedBrizOutput,
} from './dto/get-pinned-briz.dto';

import { Briz } from './entities/briz.entity';
import { Grid } from './entities/grid.entity';
import { Text } from './entities/text.entity';

@Injectable()
export class BrizsService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
    @InjectRepository(Briz)
    private readonly briz: Repository<Briz>,
    @InjectRepository(Grid)
    private readonly grid: Repository<Grid>,
    @InjectRepository(Text)
    private readonly text: Repository<Text>,
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

  async editBriz(
    owner: User,
    editBrizInput: EditBrizInput,
  ): Promise<EditBrizOutput> {
    try {
      const id = editBrizInput.brizId;
      const briz = await this.briz.findOne({
        relations: { owner: true, grid: true, text: true },
        where: {
          id,
        },
      });
      if (!briz) {
        return {
          ok: false,
          error: 'Briz not found',
        };
      }
      if (owner.id !== briz.owner.id) {
        return {
          ok: false,
          error: "You can't edit a briz that you don't own",
        };
      }
      if (editBrizInput.grid) {
        await this.grid.update({ id: briz.grid.id }, editBrizInput.grid);
      }
      if (editBrizInput.text) {
        await this.text.update({ id: briz.text.id }, editBrizInput.text);
      }
      await this.briz.save([
        {
          id,
          title: editBrizInput.title,
          pinned: editBrizInput.pinned,
          metatags: editBrizInput.metatags,
          description: editBrizInput.description,
          inBucket: editBrizInput.inBucket,
          zindex: editBrizInput.zindex,
        },
      ]);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not edit Briz',
      };
    }
  }

  async deleteBriz(
    owner: User,
    deleteBrizInput: DeleteBrizInput,
  ): Promise<DeleteBrizOutput> {
    try {
      const id = deleteBrizInput.brizId;
      const briz = await this.briz.findOne({
        relations: { owner: true, grid: true, text: true },
        where: {
          id,
        },
      });
      if (!briz) {
        return {
          ok: false,
          error: 'Briz not found',
        };
      }
      if (owner.id !== briz.owner.id) {
        return {
          ok: false,
          error: "You can't delete a briz that you don't own",
        };
      }
      if (briz.text) {
        await this.text.delete({ id: briz.text.id });
      }
      await this.grid.delete({ id: briz.grid.id });
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

  async getBriz(
    authUser: User,
    getBrizInput: GetBrizInput,
  ): Promise<GetBrizOutput> {
    try {
      const authUserId = authUser.id;
      const parentId = getBrizInput.parentId;
      const ownerName = getBrizInput.brizUserName;
      const owner = await this.user.findOne({
        where: { username: ownerName },
      });
      const ownerId = owner.id;
      const getBriz = await this.briz.find({
        relations: { owner: true, grid: true, text: true },
        where: {
          owner: {
            id: ownerId,
          },
          parent: {
            id: parentId ? parentId : IsNull(),
          },
          inBucket: false,
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

  async getInBucketBriz(
    authUser: User,
    getInBucketBrizInput: GetInBucketBrizInput,
  ): Promise<GetInBucketBrizOutput> {
    try {
      const authUserId = authUser.id;
      const parentId = getInBucketBrizInput.parentId;
      const ownerName = getInBucketBrizInput.brizUserName;
      const owner = await this.user.findOne({
        where: { username: ownerName },
      });
      const ownerId = owner.id;
      const getInBucketBriz = await this.briz.find({
        relations: { owner: true, grid: true, text: true },
        where: {
          owner: {
            id: ownerId,
          },
          parent: {
            id: parentId ? parentId : IsNull(),
          },
          inBucket: true,
        },
      });
      return {
        ok: true,
        getInBucketBriz,
      };
    } catch {
      return { ok: false, error: 'Could not find Brizs' };
    }
  }

  async getParentBriz(
    authUser: User,
    getParentBrizInput: GetParentBrizInput,
  ): Promise<GetParentBrizOutput> {
    try {
      const authUserId = authUser.id;
      const parentId = getParentBrizInput.parentId;
      const ownerName = getParentBrizInput.brizUserName;
      const owner = await this.user.findOne({
        where: { username: ownerName },
      });
      const ownerId = owner.id;
      const getParentBriz = await this.briz.findOne({
        relations: { owner: true, parent: true },
        where: {
          id: parentId,
          owner: {
            id: ownerId,
          },
        },
      });
      return {
        ok: true,
        getParentBriz,
        parentOfParentBriz: getParentBriz.parent,
      };
    } catch {
      return { ok: false, error: 'Could not find Brizs' };
    }
  }

  async getPinnedBriz(
    authUser: User,
    getPinnedBrizInput: GetPinnedBrizInput,
  ): Promise<GetPinnedBrizOutput> {
    try {
      const authUserId = authUser.id;
      const ownerName = getPinnedBrizInput.brizUserName;
      const owner = await this.user.findOne({
        where: { username: ownerName },
      });
      const ownerId = owner.id;
      const getPinnedBriz = await this.briz.find({
        relations: { owner: true },
        where: {
          owner: {
            id: ownerId,
          },
          pinned: true,
        },
      });
      return {
        ok: true,
        getPinnedBriz,
      };
    } catch {
      return { ok: false, error: 'Could not find Brizs' };
    }
  }
}
