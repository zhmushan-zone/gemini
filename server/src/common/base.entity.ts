import { Entity, UpdateDateColumn, CreateDateColumn, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';
@Entity()
export class BaseEntity {
  @ObjectIdColumn()
  id: ObjectId;
  @UpdateDateColumn()
  updateAt: string;
  @CreateDateColumn()
  createAt: string;
  beforeInsert() {
    this.createAt = this.updateAt = new Date().toLocaleString();
  }
  beforeUpdate() {
    this.updateAt = new Date().toLocaleString();
  }
}
