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
import { success, response, ResponseCode } from '../common/utils';
import { CourseVO } from './vo/course.vo';
import { User } from '../user/user.entity';
import { GeminiError } from '../common/error';
import { UserService } from '../user/user.service';
import { CreateCommentDTO } from '../article/dto';
import { Article } from '../article/article.entity';
import { CommentVO } from '../article/vo';
import { Course } from './course.entity';
import { ObjectId } from 'mongodb';

@Controller('/api/courses')
export class CourseController {

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Usr() user: User, @Body() createCourseDTO: CreateCourseDTO) {
    const course = await this.courseService.save(user.id.toHexString(), createCourseDTO);
    return success(new CourseVO(course));
  }

  @Post(':id/comment')
  @UseGuards(AuthGuard('jwt'))
  async createComment(
    @Usr() user: User,
    @Body() createCommentDTO: CreateCommentDTO,
    @Param('id') id: string
  ) {
    const course = await this.courseService.findById(id);
    if (!course) return response(ResponseCode.NOT_EXISIT);
    const comment = await this.courseService.createComment(user.id.toHexString(), createCommentDTO);
    if (!comment) return response(ResponseCode.UNKNOWN);
    course.commentsId.push(comment.id.toHexString());
    const res = await this.courseService.updateById(course.authorId, id, { commentsId: course.commentsId } as Course);
    if (res instanceof GeminiError) return response(res.code);
    const commentVO = new CommentVO(comment);
    commentVO.authorUsername = user.username;
    commentVO.authorAvatar = user.avatar;
    return success(commentVO);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  delete(@Usr() user: User, @Param('id') id: string) {
    this.courseService.delete(user.id.toHexString(), id);
    return success();
  }

  @Get('search/:keyword')
  async search(@Param('keyword') keyword: string) {
    const courses = await this.courseService.search(keyword);
    const res: CourseVO[] = [];
    for (const c of courses) {
      const author = await this.userService.findById(c.authorId);
      const courseVO = new CourseVO(c);
      courseVO.authorUsername = author.username;
      courseVO.authorAvatar = author.avatar;
      courseVO.authorJob = author.job;
      courseVO.authorSignature = author.signature;
      res.push(courseVO);
    }
    return success(res);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const course = await this.courseService.findById(id);
    if (!course) return response(ResponseCode.NOT_EXISIT);
    const author = await this.userService.findById(course.authorId);
    if (!author) return response(ResponseCode.NOT_EXISIT);
    const courseVO = new CourseVO(course);
    courseVO.authorUsername = author.username;
    courseVO.authorAvatar = author.avatar;
    courseVO.authorJob = author.job;
    courseVO.authorSignature = author.signature;
    return success(courseVO);
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

  @Put(':id/:rate')
  @UseGuards(AuthGuard('jwt'))
  async courseJoin(@Usr() user: User, @Param('id') id: string, @Param('rate') rate: string) {
    const course = await this.courseService.findById(id);
    if (!course) return success(ResponseCode.NOT_EXISIT);
    if (!course.joinersId.includes(user.id.toHexString())) {
      course.joinersId.push(user.id.toHexString());
    }
    course.rate = (course.rate * (course.joinersId.length - 1) + Number.parseFloat(rate)) / course.joinersId.length;
    user.joinCourse[id] = Number.parseFloat(rate);
    this.userService.updateById(user.id.toHexString(), { joinCourse: user.joinCourse } as User);
    this.courseService.updateById(course.authorId, course.id.toHexString(), { rate: course.rate, joinersId: course.joinersId } as Course);
    return success();
  }

  constructor(
    private readonly courseService: CourseService,
    private readonly userService: UserService
  ) {
  }
}
