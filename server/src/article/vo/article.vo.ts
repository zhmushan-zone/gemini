import { Article } from '../article.entity';

export class ArticleVO extends Article {

  authorUsername: string;
  authorAvatar: string;

  constructor(article: Article) {
    super();
    this.id = article.id;
    this.title = article.title;
    this.content = article.content;
    this.coverImg = article.coverImg;
    this.type = article.type;
    this.authorId = article.authorId;
    this.status = article.status;
    this.upersId = article.upersId;
    this.commentsId = article.commentsId;
    this.category = article.category;
    this.viewnum = article.viewnum;
    this.createAt = article.createAt;
    this.updateAt = article.updateAt;
  }
}
