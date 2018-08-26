import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config';
import { CourseModule } from './course/course.module';
import { FileModule } from './file/file.module';
import { ArticleModule } from './article/article.module';
import { IssueModule } from './issue/issue.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config.typeorm),
    UserModule,
    CourseModule,
    FileModule,
    ArticleModule,
    IssueModule,
    ReportModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  constructor() { }
}
