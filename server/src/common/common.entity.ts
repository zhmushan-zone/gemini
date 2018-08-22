import { Entity, MongoRepository, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import { BaseEntity } from './base.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { scheduleJob } from 'node-schedule';

@Entity()
@Injectable()
export class Common extends BaseEntity {

  @Column()
  tagsInfo: {};

  @Column()
  IssueReplyNumWeekly: {};

  @Column()
  IssueReplyNumTotally: {};

  create(obj = {}) {
    return this.commonRepository.create(obj);
  }

  save(obj) {
    return this.commonRepository.save(obj);
  }

  get() {
    return this.commonRepository.findOne();
  }

  async increaseIssueReplyNum(id: string) {
    let commonData = await this.get();
    if (!commonData) commonData = await this.save(this.create());
    commonData.IssueReplyNumWeekly[id] = ++commonData.IssueReplyNumWeekly[id] || 1;
    commonData.IssueReplyNumTotally[id] = ++commonData.IssueReplyNumTotally[id] || 1;
    this.save(commonData);
  }

  async emptyIssueReplyNumWeekly() {
    const commonData = await this.get();
    if (commonData) {
      commonData.IssueReplyNumWeekly = {};
      this.save(commonData);
    }
  }

  repository() {
    return this.commonRepository;
  }

  @BeforeInsert()
  beforeInsert() {
    super.beforeInsert();
    if (!this.tagsInfo) this.tagsInfo = {};
    if (!this.IssueReplyNumWeekly) this.IssueReplyNumWeekly = {};
    if (!this.IssueReplyNumTotally) this.IssueReplyNumTotally = {};
  }

  @BeforeUpdate()
  beforeUpdate() {
    super.beforeUpdate();
  }

  constructor(
    @InjectRepository(Common)
    private readonly commonRepository: MongoRepository<Common>
  ) {
    super();
    scheduleJob('0 0 0 * * 1', this.emptyIssueReplyNumWeekly);
  }
}
