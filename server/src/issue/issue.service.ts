import { Injectable } from '@nestjs/common';
import { Issue, Reply, SubReply } from './issue.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseCode } from '../common/utils';
import { GeminiError } from '../common/error';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class IssueService {
  save(authorId: string, issue: Issue) {
    issue.authorId = authorId;
    const obj = this.issueRepository.create(issue);
    return this.issueRepository.save(obj);
  }

  async delete(authorId: string, issueId: string) {
    const issue = await this.issueRepository.findOne(issueId, { where: { authorId } });
    this.issueRepository.remove(issue);
  }

  async deleteReply(authorId: string, issueId: string) {
    const reply = await this.replyRepository.findOne(issueId, { where: { authorId } });
    this.replyRepository.remove(reply);
  }

  async deleteSubReply(authorId: string, issueId: string) {
    const subreply = await this.subReplyRepository.findOne(issueId, { where: { authorId } });
    this.subReplyRepository.remove(subreply);
  }

  async remove(ids: string[]) {
    const entitys = await this.findByIds(ids.map(id => new ObjectId(id)));
    for (const e of entitys) {
      await this.removeReplys(e.replysId);
    }
    this.issueRepository.remove(entitys);
  }

  async removeReplys(ids: string[]) {
    const entitys = await this.findReplyByIds(ids.map(id => new ObjectId(id)));
    for (const e of entitys) {
      await this.removeSubReplys(e.subReplysId);
    }
    this.replyRepository.remove(entitys);
  }

  async removeSubReplys(ids: string[]) {
    const entitys = await this.findSubReplyByIds(ids.map(id => new ObjectId(id)));
    this.subReplyRepository.remove(entitys);
  }

  findById(id: string) {
    return this.issueRepository.findOne(id);
  }

  findByIds(ids: ObjectId[]) {
    return this.issueRepository.findByIds(ids);
  }

  findAll() {
    return this.issueRepository.find();
  }

  findByAuthorId(authorId: string) {
    return this.issueRepository.find({ authorId });
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

  findReplyByIds(ids: ObjectId[]) {
    return this.replyRepository.findByIds(ids);
  }

  findReplyByAuthorId(authorId: string) {
    return this.replyRepository.find({ authorId });
  }

  findSubReplyByIds(ids: ObjectId[]) {
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

  search(keyword: string) {
    return this.issueRepository.find({
      where: {
        $or: [
          { title: { $regex: keyword } },
          { content: { $regex: keyword } }
        ]
      }
    });
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
