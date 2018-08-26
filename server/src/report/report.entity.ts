import { BaseEntity } from '../common/base.entity';
import { BeforeInsert, BeforeUpdate } from 'typeorm';

export class Report extends BaseEntity {

  srcId: string;
  type: ReportType;
  msg: string;
  reason: ReportReason;
  reporterId: string;

  @BeforeInsert()
  beforeInsert() {
    super.beforeInsert();
    if (!this.srcId) this.srcId = '';
    if (!this.type) this.type = 0;
    if (!this.reason) this.reason = 0;
  }

  @BeforeUpdate()
  beforeUpdate() {
    super.beforeUpdate();
  }
}

export enum ReportType {
  Issue,
  IssueReply,
  IssueSubReply
}

export enum ReportReason {

}
