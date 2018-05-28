import { Document } from 'mongoose'
import { ArticleVO } from '../vo/article'

export interface IArticle extends Document, ArticleVO {

}
