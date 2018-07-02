import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { MongoRepository } from 'typeorm';
import { Service } from '../common/interface';

@Injectable()
export class TagService implements Service<Tag> {

  save(tag: Tag) {
    return this.tagRepository.save(tag);
  }

  delete(id: string) {
    return this.tagRepository.delete(id);
  }

  findById(id: string) {
    return this.tagRepository.findOne(id);
  }

  findAll() {
    return this.tagRepository.find();
  }

  updateById(id: string, tag: Tag) {
    return this.tagRepository.update(id, tag);
  }

  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: MongoRepository<Tag>
  ) {}
}
