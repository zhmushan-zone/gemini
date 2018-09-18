import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Headers,
  UseGuards,
  Put,
  UseInterceptors,
  UploadedFile,
  FileInterceptor,
  UnsupportedMediaTypeException,
  Delete
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDTO, CreateUserDTO, CheckUserDTO, UpdateUserDTO } from './dto';
import { success, response, ResponseCode } from '../common/utils/response.util';
import { UserVO } from './vo/user.vo';
import { generateCaptcha } from '../common/utils';
import { config } from '../config';
import * as nodemailer from 'nodemailer';
import { AuthService } from '../common/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Usr } from './user.decorators';
import { User, WatchTag, UserRole, UserActivityType, CommentParent } from './user.entity';
import * as path from 'path';
import * as fs from 'fs';
import { GeminiError } from '../common/error';
import { ObjectId } from 'mongodb';
import { ArticleType } from '../article/article.entity';
import { Allow } from './role.decorators';
import { RolesGuard } from '../common/role.guard';
import { ArticleService } from '../article/article.service';
import { IssueService } from '../issue/issue.service';
import { CourseService } from '../course/course.service';

@Controller('/api/users')
export class UserController {

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return success(users.map(v => new UserVO(v)));
  }

  @Get('/auth')
  @UseGuards(AuthGuard('jwt'))
  auth(@Usr() user: User) {
    return success(
      new UserVO(
        user,
        this.authService.generateToken(
          user.username,
          this.userService.refreshToken(user)
        )
      )
    );
  }

  @Get('search/:keyword')
  async search(@Param('keyword') keyword: string) {
    const users = await this.userService.search(keyword);
    return success(users.map(u => new UserVO(u)));
  }

  @Get('activities')
  @UseGuards(AuthGuard('jwt'))
  async findActivities(@Usr() user: User) {
    for (const activity of user.activities) {
      switch (activity.type) {
        case UserActivityType.CreateArticle:
        case UserActivityType.UpArticle: {
          activity.body = await this.articleService.findById(activity.srcId);
          break;
        }
        case UserActivityType.CreateIssue:
        case UserActivityType.WatchIssue:
        case UserActivityType.ReplyIssue: {
          activity.body = await this.issueService.findById(activity.srcId);
          break;
        }
        case UserActivityType.CreateComment: {
          if (activity.commentParent === CommentParent.Article) {
            activity.body = await this.articleService.findById(activity.srcId);
          } else if (activity.commentParent === CommentParent.Course) {
            activity.body = await this.courseService.findById(activity.srcId);
          }
          break;
        }
        case UserActivityType.JoinCourse: {
          activity.body = await this.courseService.findById(activity.srcId);
          break;
        }
      }
    }
  }

  @Get('shoppingcart')
  @UseGuards(AuthGuard('jwt'))
  findShoppingcart(@Usr() user: User) {
    return success(user.shoppingcart);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findById(id);
    return success(new UserVO(user));
  }

  @Put()
  @UseGuards(AuthGuard('jwt'))
  async updateOne(@Usr() user: User, @Body() updateUserDTO: UpdateUserDTO) {
    const res = await this.userService.updateById(user.id.toHexString(), updateUserDTO);
    if (res instanceof GeminiError) return response(res.code);
    return success(new UserVO(res));
  }

  @Post('/register')
  async register(
    @Body() createUserDTO: CreateUserDTO,
    @Headers('captcha') captcha,
    @Headers('x-forwarded-for') ip = '127.0.0.1'
  ) {
    const captchaInfo = this.userService.getCaptchaInfo().get(ip);
    if (
      captchaInfo &&
      captchaInfo.captcha === captcha &&
      captchaInfo.email === createUserDTO.email
    ) {
      this.userService.getCaptchaInfo().delete(ip);
      const user = await this.userService.register(createUserDTO);
      return success(new UserVO(user, this.authService.generateToken(user.username, user.jwtKey)));
    }
    return response(ResponseCode.CAPTCHA_ERROR);
  }

  @Post('/email/validate/:email')
  validateEmail(
    @Param('email') email,
    @Headers('captcha') captcha,
    @Headers('x-forwarded-for') ip = '127.0.0.1'
  ) {
    const captchaInfo = this.userService.getCaptchaInfo().get(ip);
    if (
      captchaInfo &&
      captchaInfo.captcha === captcha &&
      captchaInfo.email === email
    ) {
      return success();
    }
    return response(ResponseCode.CAPTCHA_ERROR, ResponseCode[ResponseCode.CAPTCHA_ERROR]);
  }

  @Post('/login')
  async login(@Body() loginUserDTO: LoginUserDTO) {
    const user = await this.userService.login(loginUserDTO);
    if (user) {
      return success(
        new UserVO(
          user,
          this.authService.generateToken(
            user.username,
            this.userService.refreshToken(user)
          )
        )
      );
    }
    return response(
      ResponseCode.LOGIN_FAILED,
      ResponseCode[ResponseCode.LOGIN_FAILED]
    );
  }

  @Post('ids')
  async findGroup(@Body() ids: string[]) {
    const users = await this.userService.findByIds(ids.map(id => new ObjectId(id)));
    return success(users.map(u => new UserVO(u)));
  }

  @Put('/tags')
  @UseGuards(AuthGuard('jwt'))
  async watchTag(@Usr() user: User, @Body('tags') tags: WatchTag[]) {
    user.watchTags = tags;
    const res = await this.userService.updateById(user.id.toHexString(), user);
    if (res instanceof GeminiError) return success(res.code);
    return success();
  }

  @Put('/watch/article-type/:articleType')
  @UseGuards(AuthGuard('jwt'))
  async watchArticleTypes(@Usr() user: User, @Param('articleType') articleType: ArticleType) {
    articleType = ArticleType[ArticleType[articleType]];
    const index = user.watchArticleTypes.findIndex(i => i === articleType);
    if (index === -1) {
      user.watchArticleTypes.push(articleType);
    } else {
      user.watchArticleTypes.splice(index, 1);
    }
    const res = await this.userService.updateById(user.id.toHexString(), { watchArticleTypes: user.watchArticleTypes } as User);
    if (res instanceof GeminiError) return success(res.code);
    return success();
  }

  @Put('/watch/user/:id')
  @UseGuards(AuthGuard('jwt'))
  async watchUser(@Usr() user: User, @Param('id') id: string) {
    const index = user.watchUsersId.findIndex(i => i === id);
    const targetUser = await this.userService.findById(id);
    if (!targetUser) return response(ResponseCode.NOT_EXISIT);
    if (index === -1) {
      user.watchUsersId.push(id);
      targetUser.watchedUsersId.push(user.id.toHexString());
    } else {
      user.watchUsersId.splice(index, 1);
      targetUser.watchedUsersId.splice(
        targetUser.watchedUsersId.findIndex(i => i === user.id.toHexString()), 1
      );
    }
    const res = await this.userService.updateById(user.id.toHexString(), { watchUsersId: user.watchUsersId } as User);
    if (res instanceof GeminiError) return success(res.code);
    await this.userService.updateById(id, { watchedUsersId: targetUser.watchedUsersId } as User);
    return success();
  }

  @Put('shoppingcart')
  @UseGuards(AuthGuard('jwt'))
  async changeShoppingcart(@Usr() user: User, @Body() courseIds: string[]) {
    this.userService.updateById(user.id.toHexString(), { shoppingcart: courseIds } as User);
    return success();
  }

  @Post('/has')
  async has(@Body() checkUserDTO: CheckUserDTO) {
    const user = await this.userService.findOne(checkUserDTO);
    if (user) {
      return success(true);
    }
    return success(false);
  }

  @Put('avatar')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('avatar', {
    dest: config.path.avatar
  }))
  updateAvatar(@Usr() user: User, @UploadedFile() avatar) {
    if (!/^(image\/)./i.test(avatar.mimetype)) {
      return new UnsupportedMediaTypeException();
    }
    else {
      this.userService.updateById(user.id.toHexString(), { avatar: avatar.filename } as User);
      if (user.avatar) {
        fs.unlink(path.join(config.path.avatar, user.avatar), err => err);
      }
    }
    return success(avatar.filename);
  }

  @Post('/email/send/:email')
  sendEmail(@Param('email') email: string, @Headers('x-forwarded-for') ip = '127.0.0.1') {
    const captchaInfo = this.userService.getCaptchaInfo().get(ip);
    if (!captchaInfo || !captchaInfo.ban) {
      const captcha = generateCaptcha();
      this.userService.getCaptchaInfo().set(ip, { email, captcha, ban: true });
      setTimeout(() => this.userService.getCaptchaInfo().delete(ip), config.email.expiresIn);
      setTimeout(() => this.userService.getCaptchaInfo().set(ip, {
        email,
        captcha,
        ban: false
      }), config.email.resendTime);
      return new Promise((resolve, reject) => {
        mailTransport.sendMail({
          from: config.email.from,
          to: email,
          subject: config.email.subject,
          html: config.email.html(captcha)
        }, (err, info) => {
          if (err) {
            resolve(response(ResponseCode.EMAIL_SEND_FAILED, err.message));
          } else {
            resolve(success());
          }
        });
      });
    }
    return response(
      ResponseCode.EMAIL_SEND_FAILED,
      ResponseCode[ResponseCode.EMAIL_SEND_FAILED]
    );

  }

  @Delete(':id')
  @Allow(UserRole.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async delete(@Param('id') id: string) {
    await this.userService.delete(id);
    return success();
  }

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly articleService: ArticleService,
    private readonly issueService: IssueService,
    private readonly courseService: CourseService
  ) {
  }
}

const mailTransport = nodemailer.createTransport({
  host: config.email.host,
  auth: config.email.auth,
  secure: config.email.secure
});
