import { Issue, IssueStatus } from '../issue.entity';
import { WatchTag } from '../../user/user.entity';
export class IssueVO extends Issue {
  id: string;
  title: string;
  content: string;
  tags: WatchTag[];
  authorId: string;
  replysId: string[];
  viewnum: number;
  watchersId: string[];
  status: IssueStatus;
  updateAt;
  createAt;

  constructor(issue: Issue) {
    super();
    this.id = issue.id;
    this.title = issue.title;
    this.content = issue.content;
    this.tags = issue.tags;
    this.authorId = issue.authorId;
    this.replysId = issue.replysId;
    this.viewnum = issue.viewnum;
    this.watchersId = issue.watchersId;
    this.status = issue.status;
    this.updateAt = issue.updateAt;
    this.createAt = issue.createAt;
  }
}
