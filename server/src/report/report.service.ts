import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { Report } from './report.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReportService {

  save(reporterId: string, report: Report) {
    report.reporterId = reporterId;
    const obj = this.reportRepository.create(report);
    return this.reportRepository.save(obj);
  }

  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: MongoRepository<Report>
  ) {}
}
