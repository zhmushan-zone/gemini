import { Injectable } from '@nestjs/common';
import { Service } from '../common/interface';
import { Issue } from './issue.entity';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class IssueService implements Service<Issue> {
  save(authorId: string, issue: Issue) {
    issue.authorId = authorId;
    return this.issueRepository.save(issue);
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

  updateById(id: string, issue: Issue) {
    this.issueRepository.update(id, issue);
  }

  constructor(
    @InjectRepository(Issue)
    private readonly issueRepository: MongoRepository<Issue>
  ) {}
}
