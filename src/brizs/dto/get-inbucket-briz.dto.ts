import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Briz } from '../entities/briz.entity';

@InputType()
export class GetInBucketBrizInput {
  @Field((type) => String)
  brizUserName: string;
  @Field((type) => Int, { nullable: true })
  parentId: number;
}

@ObjectType()
export class GetInBucketBrizOutput extends CoreOutput {
  @Field((type) => [Briz])
  getInBucketBriz?: Briz[];
}
