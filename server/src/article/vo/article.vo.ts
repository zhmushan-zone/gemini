import { Article } from '../article.entity';

export class ArticleVO extends Article {

  constructor(article: Article) {
    super();
    this.id = article.id;
    this.title = article.title;
    this.content = article.content;
    this.coverImg = article.coverImg;
    this.type = article.type;
    this.authorId = article.authorId;
    this.commentsId = article.commentsId;
    this.createAt = article.createAt;
    this.updateAt = article.updateAt;
  }
}
