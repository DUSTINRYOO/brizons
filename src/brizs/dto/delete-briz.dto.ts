import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class DeleteBrizInput {
  @Field((type) => Number)
  brizId: number;
}

@ObjectType()
export class DeleteBrizOutput extends CoreOutput {}
