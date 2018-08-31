import { Comment } from '../article.entity';

export class CommentVO extends Comment {
  authorUsername: string;
  authorAvatar: string;

  constructor(c: Comment) {
    super();
    this.id = c.id;
    this.content = c.content;
    this.authorId = c.authorId;
    this.commentsId = c.commentsId;
    this.upersId = c.upersId;
    this.downersId = c.downersId;
    this.createAt = c.createAt;
    this.updateAt = c.updateAt;
  }
}
