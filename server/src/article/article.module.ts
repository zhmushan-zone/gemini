import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { CommonModule } from '../common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article]),
    CommonModule
  ],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule { }
