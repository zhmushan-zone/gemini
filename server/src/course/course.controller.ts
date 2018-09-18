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
import { User, UserActivityType, CommentParent } from '../user/user.entity';
import { GeminiError } from '../common/error';
import { UserService } from '../user/user.service';
import { CreateCommentDTO } from '../article/dto';
import { Article } from '../article/article.entity';
import { CommentVO } from '../article/vo';
import { Course } from './course.entity';
import { ObjectId } from 'mongodb';
import { from, forkJoin } from 'rxjs';
import { map, scan } from 'rxjs/operators';
import { config } from '../config';

@Controller('/api/courses')
export class CourseController {

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Usr() user: User, @Body() createCourseDTO: CreateCourseDTO) {
    const course = await this.courseService.save(user.id.toHexString(), createCourseDTO);
    return success(new CourseVO(course));
  }

  @Post('ids')
  async findGroup(@Body() ids: string[]) {
    const courses = await this.courseService.findByIds(ids.map(id => new ObjectId(id)));
    return success(courses.map(c => new CourseVO(c)));
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

    await this.userService.updateActivities(
      user.id.toHexString(),
      { srcId: course.id.toHexString(), type: UserActivityType.CreateComment, commentParent: CommentParent.Course }
    );

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

  @Put('join')
  @UseGuards(AuthGuard('jwt'))
  async courseJoin(@Usr() user: User, @Body() ids: string[]) {
    const courses = from(await this.courseService.findByIds(ids.map(i => new ObjectId(i))));
    const amount = (await forkJoin(courses.pipe(
      map(c => c.price),
      scan((acc, p) => acc + p)
    )).toPromise())[0];
    if (!(amount <= user.integral)) return response(ResponseCode.INTEGRAL_NOT_ENOUGH);
    courses.subscribe(async course => {
      if (!course.joinersId.includes(user.id.toHexString())) {
        course.joinersId.push(user.id.toHexString());
        user.joinCourse.push(course.id.toHexString());
        user.integral -= course.price;
        await this.userService.updateById(user.id.toHexString(), { joinCourse: user.joinCourse, integral: user.integral } as User);
        await this.courseService.updateById(course.authorId, course.id.toHexString(), { rate: course.rate, joinersId: course.joinersId } as Course);

        await this.userService.updateActivities(
          user.id.toHexString(),
          { srcId: course.id.toHexString(), type: UserActivityType.JoinCourse }
        );

      }
    });
    return success();
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateOne(
    @Usr() user: User,
    @Body() updateCourseDTO: UpdateCourseDTO,
    @Param('id') id: string
  ) {
    const res = await this.courseService.updateById(user.id.toHexString(), id, updateCourseDTO);
    if (res instanceof GeminiError) return response(res.code);
    return success(new CourseVO(res));
  }

  @Put('rate/:id')
  @UseGuards(AuthGuard('jwt'))
  async rate(@Usr() user: User, @Param('id') id: string, @Body() rateInfo: { rate: number, rateComment: string }) {
    const { rate, rateComment } = rateInfo;
    const course = await this.courseService.findById(id);
    if (!course) return response(ResponseCode.NOT_EXISIT);
    if (!course.joinersId.includes(user.id.toHexString())) return response(ResponseCode.NOT_COURSE_JOINER);

    if (course.rate[user.id.toHexString()] !== null && course.rateComment[user.id.toHexString()] !== null) {
      const err = await this.userService.addIntegral(user.id.toHexString(), config.integral.course.rateAndRateComment);
      if (err instanceof GeminiError) return response(err.code);
    }

    course.rate[user.id.toHexString()] = rate;
    course.rateComment[user.id.toHexString()] = rateComment;
    await this.courseService.updateById(course.authorId, course.id.toHexString(), { rate: course.rate, rateComment: course.rateComment } as Course);
    return success();
  }

  constructor(
    private readonly courseService: CourseService,
    private readonly userService: UserService
  ) {
  }
}
