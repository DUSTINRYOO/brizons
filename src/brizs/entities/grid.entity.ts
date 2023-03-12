import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber, isNumber } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, JoinColumn, OneToOne, RelationId } from 'typeorm';
import { Briz } from './briz.entity';

@InputType('GridInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Grid extends CoreEntity {
  @Column()
  @Field((type) => Number)
  @IsNumber()
  colStart: number;

  @Column()
  @Field((type) => Number)
  @IsNumber()
  colEnd: number;

  @Column()
  @Field((type) => Number)
  @IsNumber()
  rowStart: number;

  @Column()
  @Field((type) => Number)
  @IsNumber()
  rowEnd: number;

  @OneToOne(() => Briz, (briz) => briz.grid, {
    onDelete: 'CASCADE',
  })
  briz: Briz;
}
