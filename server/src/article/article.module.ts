import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { CommonModule } from '../common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article, Comment } from './article.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article, Comment]),
    CommonModule
  ],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule { }
