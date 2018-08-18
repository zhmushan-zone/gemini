import { SubReply } from '../issue.entity';

export class SubReplyVO extends SubReply {
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
