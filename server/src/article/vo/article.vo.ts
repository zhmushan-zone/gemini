import { Article, ArticleType } from '../article.entity';

export class ArticleVO extends Article {
  id: string;
  title: string;
  coverImg: string;
  type: ArticleType[];
  authorId: string;

  constructor(article: Article) {
    super();
    this.id = article.id;
    this.title = article.title;
    this.coverImg = article.coverImg;
    this.type = article.type;
    this.authorId = article.authorId;
  }
}
