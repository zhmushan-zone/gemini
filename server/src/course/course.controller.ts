import {
  Body,
  Controller,
  Delete, FileInterceptor, FilesInterceptor,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards, UseInterceptors,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Usr } from '../user/user.decorators';
import { CreateCourseDTO, UpdateCourseDTO } from './dto';
import { CourseService } from './course.service';
import { success } from '../common/utils';
import { CourseVO } from './vo/course.vo';
import { User } from '../user/user.entity';
import { config } from '../config';

@Controller('/api/courses')
export class CourseController {

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Usr() user: User, @Body() createCourseDTO: CreateCourseDTO) {
    const course = await this.courseService.save(user.id, createCourseDTO);
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
    return success(new CourseVO(course));
  }

  @Get()
  async findAll() {
    const courses = await this.courseService.findAll();
    return success(courses.map(course => new CourseVO(course)));
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
