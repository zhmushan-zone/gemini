import { Module } from '@nestjs/common';
import { NoticeGateway } from './notice.gateway';
import { NoticeController } from './notice.controller';
import { AuthModule } from '../common/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notice } from './notice.entity';
import { NoticeService } from './notice.service';
import { IssueModule } from '../issue/issue.module';
import { CourseModule } from '../course/course.module';
import { ArticleModule } from '../article/article.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Notice]),
    IssueModule,
    ArticleModule,
    CourseModule
  ],
  controllers: [NoticeController],
  providers: [NoticeGateway, NoticeService],
  exports: [NoticeGateway, NoticeService]
})
export class NoticeModule {}
