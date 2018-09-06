import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course]),
    CommonModule
  ],
  controllers: [CourseController],
  providers: [
    CourseService
  ]
})
export class CourseModule {
}
