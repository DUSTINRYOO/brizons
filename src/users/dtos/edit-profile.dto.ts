import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from '../entities/user.entity';

@InputType()
export class EditProfileInput extends PartialType(
  PickType(User, [
    'username',
    'email',
    'password',
    'name',
    'biography',
    'profileImg',
  ]),
) {}

@ObjectType()
export class EditProfileOutput extends CoreOutput {
  @Field((type) => String, { nullable: true })
  username?: string;

  @Field((type) => String, { nullable: true })
  profileImg?: string;
}
