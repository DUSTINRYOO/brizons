import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateExampleDto } from './create-example.dto';

@InputType()
export class UpdateExampleInputType extends PartialType(CreateExampleDto) {}

@InputType()
export class UpdateExampleDto {
  @Field((type) => Number)
  id: number;

  @Field((type) => UpdateExampleInputType)
  data: UpdateExampleInputType;
}
