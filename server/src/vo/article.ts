import { IArticle } from '../models/article'

export class ArticleVO {
  id?: any
  userId: string
  title: string
  content: string
  cover: string
  label: string

  constructor(article: IArticle | ArticleVO) {
    this.id = article.id
    this.userId = article.userId
    this.title = article.title
    this.content = article.content
    this.cover = article.cover
    this.label = article.label
  }
}
