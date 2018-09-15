import { Entity, MongoRepository, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import { BaseEntity } from './base.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { scheduleJob } from 'node-schedule';
import { WatchTag } from '../user/user.entity';

@Entity()
@Injectable()
export class Common extends BaseEntity {

  @Column()
  tagsInfo: {};

  @Column()
  issueReplyNumWeekly: {};

  @Column()
  issueReplyNumTotally: {};

  @Column()
  userApprovedNumByTags: {};

  @Column()
  articleUpNumWeekly: {};

  @Column()
  articleUpNumMonthly: {};

  create(obj = {}) {
    return this.commonRepository.create(obj);
  }

  save(common: Common) {
    return this.commonRepository.save(common) as Promise<Common>;
  }

  async get() {
    const commonData = await this.commonRepository.findOne();
    if (!commonData) return this.save(this.create());
    return commonData;
  }

  async increaseIssueReplyNum(id: string) {
    const commonData = await this.get();
    commonData.issueReplyNumWeekly[id] = ++commonData.issueReplyNumWeekly[id] || 1;
    commonData.issueReplyNumTotally[id] = ++commonData.issueReplyNumTotally[id] || 1;
    this.save(commonData);
  }

  async emptyIssueReplyNumWeekly() {
    const commonData = await this.get();
    commonData.issueReplyNumWeekly = {};
    this.save(commonData);
  }

  async increaseUserApprovedNumByTags(tags: WatchTag[], userId: string) {
    const commonData = await this.get();
    tags.forEach(t => {
      if (!commonData.userApprovedNumByTags[t]) commonData.userApprovedNumByTags[t] = {};
      commonData.userApprovedNumByTags[t][userId] = ++commonData.userApprovedNumByTags[t][userId] || 1;
    });
    this.save(commonData);
  }

  async decreaseUserApprovedNumByTags(tags: WatchTag[], userId: string) {
    const commonData = await this.get();
    tags.forEach(t => {
      if (!commonData.userApprovedNumByTags[t]) commonData.userApprovedNumByTags[t] = {};
      commonData.userApprovedNumByTags[t][userId] = --commonData.userApprovedNumByTags[t][userId] || 0;
    });
    this.save(commonData);
  }

  async increaseArticleUpNum(id: string) {
    const commonData = await this.get();
    commonData.articleUpNumWeekly[id] = ++commonData.articleUpNumWeekly[id] || 1;
    commonData.articleUpNumMonthly[id] = ++commonData.articleUpNumMonthly[id] || 1;
    this.save(commonData);
  }

  async emptyArticleUpNumWeekly() {
    const commonData = await this.get();
    commonData.articleUpNumWeekly = {};
    this.save(commonData);
  }

  async emptyArticleUpNumMonthly() {
    const commonData = await this.get();
    commonData.articleUpNumMonthly = {};
    this.save(commonData);
  }

  repository() {
    return this.commonRepository;
  }

  @BeforeInsert()
  beforeInsert() {
    super.beforeInsert();
    if (!this.tagsInfo) this.tagsInfo = {};
    if (!this.issueReplyNumWeekly) this.issueReplyNumWeekly = {};
    if (!this.issueReplyNumTotally) this.issueReplyNumTotally = {};
    if (!this.userApprovedNumByTags) this.userApprovedNumByTags = {};
    if (!this.articleUpNumWeekly) this.articleUpNumWeekly = {};
    if (!this.articleUpNumMonthly) this.articleUpNumMonthly = {};
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
    scheduleJob('0 0 0 * * 1', this.emptyArticleUpNumWeekly);
    scheduleJob('0 0 0 1 * *', this.emptyArticleUpNumMonthly);
  }
}
