import { CreateBrizInput } from './create-briz.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBrizInput extends PartialType(CreateBrizInput) {
  @Field(() => Int)
  id: number;
}
