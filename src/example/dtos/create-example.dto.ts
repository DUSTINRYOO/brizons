import { ArgsType, Field } from '@nestjs/graphql';
import { IsBoolean, IsString, Length } from 'class-validator';

@ArgsType()
export class CreateExampleDto {
  @Field((type) => String)
  @IsString()
  name: string;

  @Field((type) => Boolean)
  @IsBoolean()
  isGood: boolean;

  @Field((type) => String)
  @IsString()
  @Length(5, 10)
  title: string;
}
