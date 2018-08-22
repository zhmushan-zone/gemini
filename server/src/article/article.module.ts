import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { CommonModule } from '../common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article, Comment } from './article.entity';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article, Comment, User]),
    CommonModule
  ],
  controllers: [ArticleController],
  providers: [ArticleService, UserService]
})
export class ArticleModule { }
