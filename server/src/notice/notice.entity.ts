import { Entity, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import { BaseEntity } from '../common/base.entity';

@Entity()
export class Notice extends BaseEntity {

  @Column()
  from: string;

  @Column()
  type: NoticeType;

  @Column()
  to: string;

  @Column()
  isRead: boolean;

  @Column()
  content: string;

  @Column()
  srcId: string;

  @BeforeInsert()
  beforeInsert() {
    super.beforeInsert();
    if (!this.from) this.from = '';
    if (!this.type) this.type = 0;
    if (!this.to) this.to = '';
    if (!this.isRead) this.isRead = false;
    if (!this.content) this.content = '';
    if (!this.srcId) this.srcId = '';
  }

  @BeforeUpdate()
  beforeUpdate() {
    super.beforeUpdate();
  }
}

export enum NoticeType {
  Article,
  Issue,
  Report,
  Course
}
