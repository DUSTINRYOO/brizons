import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { CreateBrizInput } from './create-briz.dto';

@InputType()
export class EditBrizInput extends PartialType(CreateBrizInput) {
  @Field((type) => Number)
  brizId: number;
}

@ObjectType()
export class EditBrizOutput extends CoreOutput {}
