import { ObjectIdColumn, Entity, Column } from 'typeorm';

@Entity()
export class Tag {

  @ObjectIdColumn()
  id: string;

  @Column()
  name: string;
}
