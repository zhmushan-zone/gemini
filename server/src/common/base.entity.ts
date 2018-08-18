import { Entity, UpdateDateColumn, CreateDateColumn, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';
@Entity()
export class BaseEntity {
  @ObjectIdColumn()
  id: ObjectId;
  @UpdateDateColumn()
  updateAt;
  @CreateDateColumn()
  createAt;
}
