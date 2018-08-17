import {
  Entity,
  Column
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
}

export enum IssueStatus {
  Pending,
  Accpet,
  Reject
}

export class Reply extends BaseEntity {

  @Column()
  content: string;

  @Column()
  authorId: string;

  @Column()
  subReplysId: string[];

  @Column()
  endorsersId: string[];

  @Column()
  opponentsId: string[];
}

export class SubReply extends BaseEntity {

  @Column()
  content: string;

  @Column()
  from: string;

  @Column()
  to: string;
}
