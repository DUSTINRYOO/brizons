import { ArgsType, Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from '../entities/user.entity';

@InputType()
export class GetUserProfilesInput {
  @Field((type) => Number)
  scrollPage: number;
}

@ObjectType()
export class GetUserProfilesOutput extends CoreOutput {
  @Field((type) => [User])
  getUserProfiles?: User[];

  @Field((type) => Number)
  totalUsersCount?: number;
}
