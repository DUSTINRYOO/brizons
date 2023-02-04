import { Field, ObjectType } from '@nestjs/graphql';
import { number } from 'joi';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Example {
  @PrimaryGeneratedColumn()
  @Field((types) => Number)
  id: number;

  @Field((types) => String)
  @Column()
  name: string;

  @Field((types) => Boolean, { nullable: true })
  @Column()
  isGood: true;

  @Field((types) => String)
  @Column()
  title: string;

  @Field((types) => String)
  @Column()
  category: string;
}
