import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  FilesInterceptor,
  UploadedFiles,
  UnsupportedMediaTypeException,
  Get
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Usr } from '../user/user.decorators';
import { User, UserRole } from '../user/user.entity';
import { config } from '../config';
import { VideoService } from './video.service';
import * as fs from 'fs';
import * as path from 'path';
import { ResponseCode, success } from '../common/utils';
import { Allow } from '../user/role.decorators';
import { RolesGuard } from '../common/role.guard';

@Controller('/api/videos')
export class VideoController {

  @Post()
  @Allow(UserRole.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseInterceptors(FilesInterceptor('video', Infinity, {
    dest: config.path.video
  }))
  async create(@UploadedFiles() videoFiles) {
    const res = [];
    for (const video of videoFiles) {
      if (!/^(video\/)./i.test(video.mimetype)) {
        fs.unlink(path.join(config.path.video, video.filename), err => err);
        res.push(ResponseCode.NOT_VIDEO);
      } else {
        res.push(video.filename);
      }
    }
    return success(res);
  }

  @Get()
  async findAll() {
    // const videos = await this.videoService.findAll();
    // return videos.map(v => new VideoVO(v));
  }

  constructor(
    private videoService: VideoService
  ) {
  }
}
