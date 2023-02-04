import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExampleDto } from './dtos/create-example.dto';
import { UpdateExampleDto } from './dtos/update-example.dto';
import { Example } from './entities/example.entity';

@Injectable()
export class ExampleService {
  constructor(
    @InjectRepository(Example)
    private readonly examples: Repository<Example>,
  ) {}
  getAll(): Promise<Example[]> {
    return this.examples.find();
  }
  createExample(createExampleDto: CreateExampleDto) {
    const newExample = this.examples.create(createExampleDto);
    return this.examples.save(newExample);
  }
  updateExample({ id, data }: UpdateExampleDto) {
    return this.examples.update(id, { ...data });
  }
}
