import { Entity, MongoRepository, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Entity()
@Injectable()
export class Common extends BaseEntity {

  @Column()
  tagsInfo: {};

  save(obj) {
    return this.commonRepository.save(obj);
  }

  get() {
    return this.commonRepository.findOne();
  }

  repository() {
    return this.commonRepository;
  }

  constructor(
    @InjectRepository(Common)
    private readonly commonRepository: MongoRepository<Common>
  ) {
    super();
  }
}
