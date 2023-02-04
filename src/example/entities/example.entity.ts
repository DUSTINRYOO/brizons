import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Example {
  @PrimaryGeneratedColumn()
  @Field((type) => Number)
  id: number;

  @Field((type) => String)
  @Column()
  name: string;

  @Field((type) => Boolean)
  @Column()
  isGood: boolean;

  @Field((type) => String)
  @Column()
  title: string;

  @Field((type) => String)
  @Column()
  category: string;
}
