import { Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Issue {

  @ObjectIdColumn()
  id: string;

}
