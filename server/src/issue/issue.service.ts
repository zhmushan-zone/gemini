import { Injectable } from '@nestjs/common';
import { Issue, Reply, SubReply } from './issue.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseCode } from '../common/utils';
import { GeminiError } from '../common/error';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'bson';

@Injectable()
export class IssueService {
  save(authorId: string, issue: Issue) {
    issue.authorId = authorId;
    const obj = this.issueRepository.create(issue);
    return this.issueRepository.save(obj);
  }

  async delete(authorId: string, issueId: string) {
    const issue = await this.issueRepository.findOne(issueId, { where: { authorId } });
    this.issueRepository.delete(issue);
  }

  findById(id: string) {
    return this.issueRepository.findOne(id);
  }

  findAll() {
    return this.issueRepository.find();
  }

  async updateById(authorId: string, id: string, issue: Issue) {
    const doc = await this.issueRepository.findOne(id, { where: { authorId } });
    if (!doc) return new GeminiError(ResponseCode.NOT_EXISIT);
    for (const key in issue) doc[key] = issue[key];
    return this.issueRepository.save(doc);
  }

  async updateByIdWithAdmin(id: string, issue: Issue) {
    const doc = await this.issueRepository.findOne(id);
    if (!doc) return new GeminiError(ResponseCode.NOT_EXISIT);
    for (const key in issue) doc[key] = issue[key];
    return this.issueRepository.save(doc);
  }

  async updateByIdWithoutUpdateDate(id: string, issue: Issue) {
    return this.issueRepository.update(id, issue);
  }

  createReply(authorId: string, reply: Reply, issueId: string) {
    reply.authorId = authorId;
    reply.issueId = issueId;
    const obj = this.replyRepository.create(reply);
    return this.replyRepository.save(obj);
  }

  findReplyById(id: string) {
    return this.replyRepository.findOne(id);
  }

  findReplysById(ids: ObjectId[]) {
    return this.replyRepository.findByIds(ids);
  }

  findSubReplysById(ids: ObjectId[]) {
    return this.subReplyRepository.findByIds(ids);
  }

  async updateReplyById(authorId: string, id: string, reply: Reply) {
    const doc = await this.replyRepository.findOne(id, { where: { authorId } });
    if (!doc) return new GeminiError(ResponseCode.NOT_EXISIT);
    for (const key in reply) doc[key] = reply[key];
    return this.replyRepository.save(doc);
  }

  createSubReply(from: string, subreply: SubReply) {
    subreply.from = from;
    const obj = this.subReplyRepository.create(subreply);
    return this.subReplyRepository.save(obj);
  }

  constructor(
    @InjectRepository(Issue)
    private readonly issueRepository: MongoRepository<Issue>,
    @InjectRepository(Reply)
    private readonly replyRepository: MongoRepository<Reply>,
    @InjectRepository(SubReply)
    private readonly subReplyRepository: MongoRepository<SubReply>
  ) { }
}
