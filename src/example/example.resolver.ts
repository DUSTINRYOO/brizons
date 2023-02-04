import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class ExampleResolver {
  @Query((returns) => Boolean)
  isGood(): Boolean {
    return true;
  }
}
