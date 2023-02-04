import { Query, Resolver } from '@nestjs/graphql';
import { Example } from './entities/example.entity';

@Resolver((of) => Example)
export class ExampleResolver {
  @Query((returns) => Example)
  firstExample() {
    return true;
  }
}
