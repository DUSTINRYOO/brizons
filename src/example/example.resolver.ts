import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateExampleDto } from './dtos/create-example.dto';
import { UpdateExampleDto } from './dtos/update-example.dto';
import { Example } from './entities/example.entity';
import { ExampleService } from './example.service';

@Resolver((of) => Example)
export class ExampleResolver {
  constructor(private readonly exampleService: ExampleService) {}
  @Query((returns) => [Example])
  examples(): Promise<Example[]> {
    return this.exampleService.getAll();
  }
  @Mutation((returns) => Boolean)
  async createExample(
    @Args('input') createExampleDto: CreateExampleDto,
  ): Promise<boolean> {
    try {
      await this.exampleService.createExample(createExampleDto);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  @Mutation((returns) => Boolean)
  async updateExample(
    @Args('input') updateExampleDto: UpdateExampleDto,
  ): Promise<boolean> {
    try {
      await this.exampleService.updateExample(updateExampleDto);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
