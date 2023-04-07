import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from '../entities/user.entity';

@InputType()
export class GetOthersProfileInput {
  @Field((type) => String)
  username: string;
}

@ObjectType()
export class GetOthersProfileOutput extends CoreOutput {
  @Field((type) => User, { nullable: true })
  user?: User;
}
