import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { Grid } from './grid.entity';
import { Text } from './text.entity';

@InputType('BrizInputType', { isAbstract: true })
@ObjectType()
@Entity()
@Tree('closure-table')
export class Briz extends CoreEntity {
  @Column()
  @Field((type) => String)
  @IsString()
  title: string;

  @Column({ default: false })
  @Field((type) => Boolean)
  @IsBoolean()
  pinned: boolean;

  @Column({ default: false })
  @Field((type) => Boolean)
  @IsBoolean()
  inBucket: boolean;

  @Column()
  @Field((type) => String)
  @IsString()
  description: string;

  @Field((type) => Text, { nullable: true })
  @JoinColumn()
  @OneToOne((type) => Text, (text) => text.briz, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  text: Text;

  @Column()
  @Field((type) => String)
  @IsString()
  metatags: string;

  @Column({ default: 100 })
  @Field((type) => Number)
  @IsNumber()
  zindex: number;

  @Column()
  @Field((type) => String)
  @IsString()
  coverImg: string;

  @Field((type) => Grid)
  @JoinColumn()
  @OneToOne((type) => Grid, (grid) => grid.briz, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  grid!: Grid;

  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.brizs, { onDelete: 'CASCADE' })
  owner: User;

  @TreeChildren()
  children: Briz[];

  @TreeParent()
  parent: Briz;
}
