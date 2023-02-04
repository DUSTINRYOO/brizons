import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { createExampleDto } from './dtos/create-example.dto';
import { Example } from './entities/example.entity';
import { ExampleService } from './example.service';

@Resolver((of) => Example)
export class ExampleResolver {
  constructor(private readonly exampleService: ExampleService) {}
  @Query((returns) => [Example])
  Examples(): Promise<Example[]> {
    return this.exampleService.getAll();
  }
  @Mutation((returns) => Boolean)
  createExample(@Args() createExampleDto: createExampleDto): boolean {
    console.log(createExampleDto);
    return true;
  }
}
