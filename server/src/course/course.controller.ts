import {Body, Controller, Post, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {Usr} from '../user/user.decorators';
import {CreateCourseDTO} from './dto';
import {CourseService} from './course.service';
import {success} from '../common/utils';

@Controller('/api/courses')
export class CourseController {

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Usr() user, @Body() createCourseDTO: CreateCourseDTO) {
    const course = await this.courseService.create(user, createCourseDTO);
    return success(course);
  }

  constructor(
    private readonly courseService: CourseService
  ) {
  }
}
