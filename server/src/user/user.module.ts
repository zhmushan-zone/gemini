import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common/common.module';
import { CourseModule } from '../course/course.module';
import { ArticleModule } from '../article/article.module';
import { IssueModule } from '../issue/issue.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CommonModule,
    ArticleModule,
    IssueModule,
    CourseModule
  ],
  providers: [
    UserService
  ],
  controllers: [UserController],
  exports: [
    UserService
  ]
})
export class UserModule {
}
