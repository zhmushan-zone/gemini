import { Notice } from './notice.entity';
import { MongoRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice)
    private readonly noticeRepository: MongoRepository<Notice>
  ) { }

  async save(notice: Notice) {
    const obj = this.noticeRepository.create(notice);
    return this.noticeRepository.save(obj);
  }
}
