import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from '../entities/user.entity';

@InputType()
export class DeleteAccountInput {
  @Field((type) => String)
  username: string;
}

@ObjectType()
export class DeleteAccountOutput extends CoreOutput {}
