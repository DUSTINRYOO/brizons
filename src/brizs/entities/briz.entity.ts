import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@InputType('BrizInputType', { isAbstract: true })
@ObjectType()
@Entity()
@Tree('closure-table')
export class Briz extends CoreEntity {
  @Column({ unique: true })
  @Field((type) => String)
  @IsString()
  title: string;

  @Column()
  @Field((type) => String)
  @IsString()
  description: string;

  @Column()
  @Field((type) => String)
  @IsString()
  metatags: string;

  @Column()
  @Field((type) => String)
  @IsString()
  coverImg: string;

  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.brizs, { onDelete: 'CASCADE' })
  owner: User;

  @TreeChildren()
  children: Briz[];

  @TreeParent()
  parent: Briz;
}
