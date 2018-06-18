import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {Usr} from '../user/user.decorators';
import {CreateCourseDTO, UpdateCourseDTO} from './dto';
import {CourseService} from './course.service';
import {success} from '../common/utils';
import {CourseVO} from './vo/course.vo';
import {User} from '../user/user.entity';

@Controller('/api/courses')
export class CourseController {

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Usr() user, @Body() createCourseDTO: CreateCourseDTO) {
    const course = await this.courseService.create(user.id, createCourseDTO);
    return success(new CourseVO(course));
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  delete(@Usr() user: User, @Param('id') id) {
    this.courseService.delete(user.id, id);
    return success();
  }

  @Get(':id')
  async findOne(@Param('id') id) {
    const course = await this.courseService.findById(id);
    return success(course);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateOne(@Usr() user, @Body() updateCourseDTO: UpdateCourseDTO, @Param('id') id) {
    const res = await this.courseService.updateById(id, updateCourseDTO);
    return success();
  }

  constructor(
    private readonly courseService: CourseService
  ) {
  }
}
