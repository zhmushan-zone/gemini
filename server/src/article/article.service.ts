import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Article } from './article.entity';
import { Service } from '../common/interface';

@Injectable()
export class ArticleService implements Service<Article> {

  save(authorId: string, article: Article) {
    article.authorId = authorId;
    return this.articleRepository.save(article);
  }

  async delete(authorId: string, articleId: string) {
    const article = await this.articleRepository.findOne(articleId, { where: { authorId } });
    this.articleRepository.delete(article);
  }

  findById(id: string) {
    return this.articleRepository.findOne(id);
  }

  findAll() {
    return this.articleRepository.find();
  }

  updateById(id: string, article: Article) {
    this.articleRepository.update(id, article);
  }

  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: MongoRepository<Article>
  ) {}
}
