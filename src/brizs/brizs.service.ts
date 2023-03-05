import { Injectable } from '@nestjs/common';
import { CreateBrizInput } from './dto/create-briz.input';
import { UpdateBrizInput } from './dto/update-briz.input';

@Injectable()
export class BrizsService {
  create(createBrizInput: CreateBrizInput) {
    return 'This action adds a new briz';
  }

  findAll() {
    return `This action returns all brizs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} briz`;
  }

  update(id: number, updateBrizInput: UpdateBrizInput) {
    return `This action updates a #${id} briz`;
  }

  remove(id: number) {
    return `This action removes a #${id} briz`;
  }
}
