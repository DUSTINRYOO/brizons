import { InputType, Int, Field, PickType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Briz } from '../entities/briz.entity';

@InputType()
export class CreateBrizInput extends PickType(Briz, [
  'title',
  'description',
  'metatags',
  'coverImg',
  'grid',
]) {
  @Field((type) => Int, { nullable: true })
  parentBrizId?: number;
}

@ObjectType()
export class CreateBrizOutput extends CoreOutput {}
