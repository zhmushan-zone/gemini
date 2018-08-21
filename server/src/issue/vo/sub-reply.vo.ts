import { SubReply } from '../issue.entity';

export class SubReplyVO extends SubReply {

  fromUsername: string;
  fromAvatar: string;
  toUsername: string;
  toAvatar: string;

  constructor(s: SubReply) {
    super();
    this.id = s.id;
    this.content = s.content;
    this.from = s.from;
    this.to = s.to;
    this.createAt = s.createAt;
    this.updateAt = s.updateAt;
  }
}
