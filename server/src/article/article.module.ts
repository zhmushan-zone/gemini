import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { CommonModule } from '../common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article, Comment } from './article.entity';
import { User } from '../user/user.entity';
import { AuthModule } from '../common/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article, Comment, User]),
    CommonModule,
    AuthModule
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService]
})
export class ArticleModule { }
