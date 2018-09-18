import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { CommonModule } from '../common/common.module';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { Comment } from '../article/article.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, User, Comment]),
    CommonModule
  ],
  controllers: [CourseController],
  providers: [
    CourseService,
    UserService
  ],
  exports: [CourseService]
})
export class CourseModule {
}
