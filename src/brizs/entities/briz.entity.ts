import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Briz {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
