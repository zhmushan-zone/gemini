import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Video } from './video.entity';
import { User } from '../user/user.entity';

@Injectable()
export class VideoService {

  async create(videos: Video[]) {
    const res: Video[] = [];
    for (const video of videos) {
      res.push(await this.videoRepository.save(video));
    }
    return res;
  }

  findAll() {
    return this.videoRepository.find();
  }

  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: MongoRepository<Video>
  ) {}
}
