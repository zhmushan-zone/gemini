import { Injectable } from '@nestjs/common';
import { Service } from '../common/interface';
import { Issue } from './issue.entity';

@Injectable()
export class IssueService implements Service<Issue> {
  save: (...args: any[]) => Promise<Issue>;
  delete: (...args: any[]) => void;
  findById: (id: string) => Promise<Issue>;
  findAll: () => Promise<Issue[]>;
  updateById: (id: string, t: Issue) => void;
}
