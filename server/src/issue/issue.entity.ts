import {
  Entity,
  Column,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm';
import { WatchTag } from '../user/user.entity';
import { BaseEntity } from '../common/base.entity';

@Entity()
export class Issue extends BaseEntity {

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  tags: WatchTag[];

  @Column()
  authorId: string;

  @Column()
  replysId: string[];

  @Column()
  viewnum: number;

  @Column()
  watchersId: string[];

  @Column()
  status: IssueStatus;

  @BeforeInsert()
  beforeInsert() {
    super.beforeInsert();
    if (!this.title) this.title = '';
    if (!this.content) this.content = '';
    if (!this.tags) this.tags = [];
    if (!this.authorId) this.authorId = '';
    if (!this.replysId) this.replysId = [];
    if (!this.viewnum) this.viewnum = 0;
    if (!this.watchersId) this.watchersId = [];
    if (!this.status) this.status = IssueStatus.Pending;
  }

  @BeforeUpdate()
  beforeUpdate() {
    super.beforeUpdate();
  }
}

export enum IssueStatus {
  Pending,
  Accpet,
  Reject
}

@Entity()
export class Reply extends BaseEntity {

  @Column()
  content: string;

  @Column()
  authorId: string;

  @Column()
  issueId: string;

  @Column()
  subReplysId: string[];

  @Column()
  upersId: string[];

  @Column()
  downersId: string[];

  @BeforeInsert()
  beforeInsert() {
    super.beforeInsert();
    if (!this.content) this.content = '';
    if (!this.authorId) this.authorId = '';
    if (!this.issueId) this.issueId = '';
    if (!this.subReplysId) this.subReplysId = [];
    if (!this.upersId) this.upersId = [];
    if (!this.downersId) this.downersId = [];
  }

  @BeforeUpdate()
  beforeUpdate() {
    super.beforeUpdate();
  }
}

@Entity()
export class SubReply extends BaseEntity {

  @Column()
  content: string;

  @Column()
  from: string;

  @Column()
  to: string;

  @BeforeInsert()
  beforeInsert() {
    super.beforeInsert();
    if (!this.content) this.content = '';
    if (!this.from) this.from = null;
    if (!this.to) this.to = null;
  }

  @BeforeUpdate()
  beforeUpdate() {
    super.beforeUpdate();
  }
}
