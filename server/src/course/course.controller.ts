import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {Usr} from '../user/user.decorators';
import {CreateCourseDTO} from './dto';

@Controller('/api/courses')
export class CourseController {

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Usr() user, @Body() createCourseDTO: CreateCourseDTO) {

  }
}
