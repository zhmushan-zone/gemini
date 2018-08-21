import { Reply } from '../issue.entity';

export class ReplyVO extends Reply {

  authorUsername: string;
  authorAvatar: string;

  constructor(r: Reply) {
    super();
    this.id = r.id;
    this.content = r.content;
    this.authorId = r.authorId;
    this.subReplysId = r.subReplysId;
    this.upersId = r.upersId;
    this.downersId = r.downersId;
    this.createAt = r.createAt;
    this.updateAt = r.updateAt;
  }
}
