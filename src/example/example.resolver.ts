import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { createExampleDto } from './dtos/create-example.dto';
import { Example } from './entities/example.entity';

@Resolver((of) => Example)
export class ExampleResolver {
  @Query((returns) => [Example])
  firstExample(@Args('firstOne') firstOne: Boolean): Example[] {
    console.log(firstOne);
    return [];
  }
  @Mutation((returns) => Boolean)
  createExample(
    @Args('createExample') createExample: createExampleDto,
  ): boolean {
    console.log(createExample);
    return true;
  }
}
