import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, OneToOne } from 'typeorm';
import { Briz } from './briz.entity';

@InputType('TextInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Text extends CoreEntity {
  @Column()
  @Field((type) => String)
  @IsString()
  text: string;

  @Column()
  @Field((type) => Number)
  @IsNumber()
  fontSize: number;

  @Column()
  @Field((type) => String)
  @IsString()
  bold: string;

  @Column()
  @Field((type) => Boolean)
  @IsBoolean()
  italic: boolean;

  @Column()
  @Field((type) => String)
  @IsString()
  textColor: string;

  @Column()
  @Field((type) => String)
  @IsString()
  boxColor: string;

  @Column()
  @Field((type) => String)
  @IsString()
  textColAlign: string;

  @Column()
  @Field((type) => String)
  @IsString()
  textRowAlign: string;

  @OneToOne(() => Briz, (briz) => briz.text, {
    onDelete: 'CASCADE',
  })
  briz: Briz;
}
