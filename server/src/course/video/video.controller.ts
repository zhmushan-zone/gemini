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
import {AuthGuard} from '@nestjs/passport';
import {Usr} from '../../user/user.decorators';
import {User} from '../../user/user.entity';
import {config} from '../../config';
import {VideoService} from './video.service';
import * as fs from 'fs';
import * as path from 'path';

@Controller('/api/videos')
export class VideoController {

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FilesInterceptor('video', Infinity, {
    dest: config.path.video
  }))
  async create(@Usr() user: User, @UploadedFiles() videoFiles) {
    // const videos: Video[] = [];
    // for (const videoFile of videoFiles) {
    //   if (!/^(video\/)./i.test(videoFile.mimetype)) {
    //     for (const video of videoFiles) {
    //       fs.unlink(path.join(config.path.video, video.filename), err => err);
    //     }
    //     return new UnsupportedMediaTypeException();
    //   }
    //   videos.push(new Video(user, videoFile.filename));
    // }
    // const res = await this.videoService.create(videos);
    // return res.map(v => new VideoVO(v));
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
