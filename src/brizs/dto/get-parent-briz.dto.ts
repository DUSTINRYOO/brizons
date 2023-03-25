import { ArgsType, Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Briz } from '../entities/briz.entity';

@InputType()
export class GetParentBrizInput {
  @Field((type) => String)
  brizUserName: string;
  @Field((type) => Int)
  parentId: number;
}

@ObjectType()
export class GetParentBrizOutput extends CoreOutput {
  @Field((type) => Briz)
  getParentBriz?: Briz;

  @Field((type) => Briz, { nullable: true })
  parentOfParentBriz?: Briz;
}
