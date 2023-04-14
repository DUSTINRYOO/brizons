import { ArgsType, Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Briz } from '../entities/briz.entity';

@InputType()
export class GetRecentBrizInput {
  @Field((type) => Number)
  scrollPage: number;
}

@ObjectType()
export class GetRecentBrizOutput extends CoreOutput {
  @Field((type) => [Briz])
  getRecentBriz?: Briz[];
}
