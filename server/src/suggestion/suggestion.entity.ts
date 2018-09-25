import { Entity, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import { BaseEntity } from '../common/base.entity';

@Entity()
export class Suggestion extends BaseEntity {

  @Column()
  from: string;

  @Column()
  msg: string;

  @Column()
  isRead: boolean;

  @BeforeInsert()
  beforeInsert() {
    super.beforeInsert();
    if (!this.from) this.from = '';
    if (!this.msg) this.msg = '';
    if (!this.isRead) this.isRead = false;
  }

  @BeforeUpdate()
  beforeUpdate() {
    super.beforeUpdate();
  }
}
