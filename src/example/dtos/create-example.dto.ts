import { ArgsType, Field } from '@nestjs/graphql';
import { IsBoolean, IsString, Length } from 'class-validator';

@ArgsType()
export class createExampleDto {
  @Field((type) => Boolean)
  @IsBoolean()
  firstOne: Boolean;

  @Field((type) => Boolean)
  @IsBoolean()
  isGood: Boolean;

  @Field((type) => String)
  @IsString()
  @Length(5, 10)
  title: String;
}
