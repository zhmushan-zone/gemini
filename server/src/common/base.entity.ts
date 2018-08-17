import { Entity, UpdateDateColumn, CreateDateColumn, ObjectIdColumn } from 'typeorm';
@Entity()
export class BaseEntity {
  @ObjectIdColumn()
  id: string;
  @UpdateDateColumn()
  updateAt;
  @CreateDateColumn()
  createAt;
}
