import { ArgsType, Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Briz } from '../entities/briz.entity';

@InputType()
export class GetPinnedBrizInput {
  @Field((type) => String)
  brizUserName: string;
}

@ObjectType()
export class GetPinnedBrizOutput extends CoreOutput {
  @Field((type) => [Briz])
  getPinnedBriz?: Briz[];
}
