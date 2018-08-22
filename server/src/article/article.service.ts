import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Article, Comment } from './article.entity';
import { GeminiError } from '../common/error';
import { ResponseCode } from '../common/utils';

@Injectable()
export class ArticleService {

  save(authorId: string, article: Article) {
    article.authorId = authorId;
    const obj = this.articleRepository.create(article);
    return this.articleRepository.save(obj);
  }

  async delete(authorId: string, id: string) {
    const article = await this.articleRepository.findOne(id, { where: { authorId } });
    this.articleRepository.delete(article);
  }

  findById(id: string) {
    return this.articleRepository.findOne(id);
  }

  findAll() {
    return this.articleRepository.find();
  }

  findByAuthorId(authorId: string) {
    return this.articleRepository.find({ authorId });
  }

  async updateById(authorId: string, id: string, article: Article) {
    const doc = await this.articleRepository.findOne(id, { where: { authorId } });
    if (!doc) return new GeminiError(ResponseCode.NOT_EXISIT);
    for (const key in article) doc[key] = article[key];
    return this.articleRepository.save(doc);
  }

  createComment(authorId: string, comment: Comment) {
    comment.authorId = authorId;
    const obj = this.commentRepository.create(comment);
    return this.commentRepository.save(obj);
  }

  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: MongoRepository<Article>,
    @InjectRepository(Comment)
    private readonly commentRepository: MongoRepository<Comment>
  ) { }
}
