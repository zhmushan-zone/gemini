import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Article } from './article.entity';

@Injectable()
export class ArticleService {

  save(authorId: string, article: Article) {
    article.authorId = authorId;
    return this.articleRepository.save(article);
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
