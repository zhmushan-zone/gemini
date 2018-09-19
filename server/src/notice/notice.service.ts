import { Notice, NoticeType } from './notice.entity';
import { MongoRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { config } from '../config';
import { IssueService } from '../issue/issue.service';
import { ArticleService } from '../article/article.service';
import { CourseService } from '../course/course.service';
import { GeminiError } from '../common/error';
import { ResponseCode } from '../common/utils';
import { ObjectId } from 'mongodb';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice)
    private readonly noticeRepository: MongoRepository<Notice>,
    private readonly issueService: IssueService,
    private readonly articleService: ArticleService,
    private readonly courseService: CourseService
  ) { }

  async save(notice: Notice) {
    const obj = notice.id ? notice : this.noticeRepository.create(notice);
    obj.createAt = new Date().toLocaleString();
    let err = new GeminiError(ResponseCode.NOT_EXISIT);
    switch (obj.type) {
      case NoticeType.issueReply: {
        const issue = await this.issueService.findById(obj.srcId);
        if (issue) err = null;
        obj.template = config.template.notice.issueReply(obj.srcId, obj.createAt, issue.title);
        break;
      }
      case NoticeType.issueSubReply: {
        const issue = await this.issueService.findById(obj.srcId);
        if (issue) err = null;
        obj.template = config.template.notice.issueSubReply(obj.srcId, obj.createAt, issue.title);
        break;
      }
      case NoticeType.issueSubReply2: {
        const issue = await this.issueService.findById(obj.srcId);
        if (issue) err = null;
        obj.template = config.template.notice.issueSubReply2(obj.srcId, obj.createAt, issue.title);
        break;
      }
      case NoticeType.IssuePass: {
        const issue = await this.issueService.findById(obj.srcId);
        if (issue) err = null;
        obj.template = config.template.notice.issuePass(obj.srcId, obj.createAt, issue.title);
        break;
      }
      case NoticeType.IssueFail: {
        const issue = await this.issueService.findById(obj.srcId);
        if (issue) err = null;
        obj.template = config.template.notice.issueFail(obj.createAt, issue.title, obj.reason);
        break;
      }
      case NoticeType.IssueReported: {
        const issue = await this.issueService.findById(obj.srcId);
        if (issue) err = null;
        obj.template = config.template.notice.issueReported(obj.createAt, issue.title, obj.reason);
        break;
      }
      case NoticeType.IssueReplyReported: {
        const issue = await this.issueService.findById(obj.srcId);
        if (issue) err = null;
        obj.template = config.template.notice.issueReplyReported(obj.srcId, obj.createAt, issue.title, obj.reason);
        break;
      }
      case NoticeType.IssueSubReplyReported: {
        const issue = await this.issueService.findById(obj.srcId);
        if (issue) err = null;
        obj.template = config.template.notice.issueSubReplyReported(obj.srcId, obj.createAt, issue.title, obj.reason);
        break;
      }
      case NoticeType.articleReply: {
        const article = await this.articleService.findById(obj.srcId);
        if (article) err = null;
        obj.template = config.template.notice.articleReply(obj.srcId, obj.createAt, article.title);
        break;
      }
      case NoticeType.articleSubReply: {
        const article = await this.articleService.findById(obj.srcId);
        if (article) err = null;
        obj.template = config.template.notice.articleSubReply(obj.srcId, obj.createAt, article.title);
        break;
      }
      case NoticeType.articleSubReply2: {
        const article = await this.articleService.findById(obj.srcId);
        if (article) err = null;
        obj.template = config.template.notice.articleSubReply2(obj.srcId, obj.createAt, article.title);
        break;
      }
      case NoticeType.articlePass: {
        const article = await this.articleService.findById(obj.srcId);
        if (article) err = null;
        obj.template = config.template.notice.articlePass(obj.srcId, obj.createAt, article.title);
        break;
      }
      case NoticeType.articleFail: {
        const article = await this.articleService.findById(obj.srcId);
        if (article) err = null;
        obj.template = config.template.notice.articleFail(obj.createAt, article.title, obj.reason);
        break;
      }
      case NoticeType.articleReported: {
        const article = await this.articleService.findById(obj.srcId);
        if (article) err = null;
        obj.template = config.template.notice.articleReported(obj.createAt, article.title, obj.reason);
        break;
      }
      case NoticeType.articleReplyReported: {
        const article = await this.articleService.findById(obj.srcId);
        if (article) err = null;
        obj.template = config.template.notice.articleReplyReported(obj.srcId, obj.createAt, article.title, obj.reason);
        break;
      }
      case NoticeType.articleSubReplyReported: {
        const article = await this.articleService.findById(obj.srcId);
        if (article) err = null;
        obj.template = config.template.notice.articleSubReplyReported(obj.srcId, obj.createAt, article.title, obj.reason);
        break;
      }
      case NoticeType.courseReplyReported: {
        const course = await this.courseService.findById(obj.srcId);
        if (course) err = null;
        obj.template = config.template.notice.courseReplyReported(obj.srcId, obj.createAt, course.title, obj.reason);
        break;
      }
      case NoticeType.courseSubReplyReported: {
        const course = await this.courseService.findById(obj.srcId);
        if (course) err = null;
        obj.template = config.template.notice.courseSubReplyReported(obj.srcId, obj.createAt, course.title, obj.reason);
        break;
      }
    }
    if (err) return err;
    return this.noticeRepository.save(obj);
  }

  findById(id: string) {
    return this.noticeRepository.findOne(id);
  }

  findByIds(ids: ObjectId[]) {
    return this.noticeRepository.findByIds(ids);
  }

  findByTo(to: string) {
    return this.noticeRepository.find({ where: { to } });
  }
}
