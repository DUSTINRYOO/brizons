import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class createExampleDto {
  @Field((type) => Boolean)
  firstOne: Boolean;
  @Field((type) => Boolean)
  isGood: Boolean;
  @Field((type) => String)
  title: String;
}
