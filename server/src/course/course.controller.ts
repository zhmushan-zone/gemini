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
import { success, response } from '../common/utils';
import { CourseVO } from './vo/course.vo';
import { User } from '../user/user.entity';
import { GeminiError } from '../common/error';

@Controller('/api/courses')
export class CourseController {

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Usr() user: User, @Body() createCourseDTO: CreateCourseDTO) {
    const course = await this.courseService.save(user.id.toHexString(), createCourseDTO);
    return success(new CourseVO(course));
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  delete(@Usr() user: User, @Param('id') id: string) {
    this.courseService.delete(user.id.toHexString(), id);
    return success();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
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
  async updateOne(
    @Usr() user: User,
    @Body() updateCourseDTO: UpdateCourseDTO,
    @Param('id') id
  ) {
    const res = await this.courseService.updateById(user.id.toHexString(), id, updateCourseDTO);
    if (res instanceof GeminiError) return response(res.code);
    return success(new CourseVO(res));
  }

  constructor(
    private readonly courseService: CourseService
  ) {
  }
}
