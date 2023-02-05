import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends CoreEntity {
  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;
}
