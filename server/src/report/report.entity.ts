import { BaseEntity } from '../common/base.entity';
import { BeforeInsert, BeforeUpdate, Entity, Column } from 'typeorm';

@Entity()
export class Report extends BaseEntity {

  @Column()
  srcId: string;
  @Column()
  type: ReportType;
  @Column()
  msg: string;
  @Column()
  reason: ReportReason;
  @Column()
  reporterId: string;
  @Column()
  status: ReportStatus;

  @BeforeInsert()
  beforeInsert() {
    super.beforeInsert();
    if (!this.srcId) this.srcId = '';
    if (!this.type) this.type = 0;
    if (!this.msg) this.msg = '';
    if (!this.reason) this.reason = 0;
    if (!this.reporterId) this.reporterId = '';
  }

  @BeforeUpdate()
  beforeUpdate() {
    super.beforeUpdate();
  }
}

export enum ReportType {
  Issue,
  IssueReply,
  IssueSubReply,
  Article,
  ArticleComment,
  ArticleSubComment
}

export enum ReportReason {
  广告或垃圾信息,
  辱骂,
  涉政或违法,
  抄袭,
  不合适内容
}

export enum ReportStatus {
  Pending,
  Accpet,
  Reject
}
