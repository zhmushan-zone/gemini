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
  template: string;

  @Column()
  srcId: string;

  @Column()
  reason: string;

  @BeforeInsert()
  beforeInsert() {
    super.beforeInsert();
    if (!this.from) this.from = '';
    if (!this.type) this.type = 0;
    if (!this.to) this.to = '';
    if (!this.isRead) this.isRead = false;
    if (!this.template) this.template = '';
    if (!this.srcId) this.srcId = '';
    if (!this.reason) this.reason = '';
  }

  @BeforeUpdate()
  beforeUpdate() {
    super.beforeUpdate();
  }
}

export enum NoticeType {
  issueReply,
  issueSubReply,
  issueSubReply2,
  IssuePass,
  IssueFail,
  IssueReported,
  IssueReplyReported,
  IssueSubReplyReported,
  articleReply,
  articleSubReply,
  articleSubReply2,
  articlePass,
  articleFail,
  articleReported,
  articleReplyReported,
  articleSubReplyReported,
  courseReplyReported,
  courseSubReplyReported
}
