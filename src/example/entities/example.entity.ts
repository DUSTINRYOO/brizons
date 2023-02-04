import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Example {
  @Field((types) => String)
  name: string;

  @Field((types) => Boolean, { nullable: true })
  isGood: true;
}
