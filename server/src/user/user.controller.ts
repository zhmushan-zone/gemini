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
  FilesInterceptor,
  UploadedFiles,
  UploadedFile,
  FileInterceptor,
  UnsupportedMediaTypeException
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDTO, CreateUserDTO, CheckUserDTO } from './dto';
import { success, response, ResponseCode } from '../common/utils/response.util';
import { UserVO } from './vo/user.vo';
import { generateCaptcha } from '../common/utils';
import { config } from '../config';
import * as nodemailer from 'nodemailer';
import { AuthService } from '../common/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Usr } from './user.decorators';
import { User } from './user.entity';
import { UpdateUserDTO } from './dto/update-user.dto';
import * as path from 'path';
import * as fs from 'fs';

@Controller('/api/users')
export class UserController {

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return success(users.map(v => new UserVO(v)));
  }

  @Put()
  @UseGuards(AuthGuard('jwt'))
  async updateOne(@Usr() user: User, @Body() updateUserDTO: UpdateUserDTO) {
    const res = await this.userService.updateById(user.id, updateUserDTO);
    return success();
  }

  @Post('/register')
  async register(@Body() createUserDTO: CreateUserDTO) {
    const user = await this.userService.register(createUserDTO);
    return success(new UserVO(user, this.authService.generateToken(user.username, user.jwtKey)));
  }

  @Post('/login')
  async login(@Body() loginUserDTO: LoginUserDTO) {
    const user = await this.userService.login(loginUserDTO);
    return success(new UserVO(user, this.authService.generateToken(user.username, user.jwtKey)));
  }

  @Post('/auth')
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
      this.userService.updateById(user.id, { avatar: avatar.filename } as User);
      if (user.avatar) { fs.unlink(path.join(config.path.avatar, user.avatar), err => err); }
    }
    return success();
  }

  @Post('/email/send/:email')
  sendEmail(@Param('email') email: string, @Headers('x-forwarded-for') ip = '127.0.0.1') {
    let captcha = emailCode.get(ip);
    if (!captcha) {
      captcha = generateCaptcha();
      emailCode.set(ip, captcha);
      setTimeout(() => emailCode.delete(ip), config.email.resendTime);
    }
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

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) { }
}

const emailCode = new Map<string, string>();
const mailTransport = nodemailer.createTransport({
  host: config.email.host,
  auth: config.email.auth
});
