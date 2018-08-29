import { Report } from '../report.entity';

export class ReportVO extends Report {
  reporterUsername: string;

  constructor(r: Report) {
    super();
    this.id = r.id;
    this.srcId = r.srcId;
    this.type = r.type;
    this.msg = r.msg;
    this.reason = r.reason;
    this.reporterId = r.reporterId;
    this.createAt = r.createAt;
    this.updateAt = r.updateAt;
  }
}
