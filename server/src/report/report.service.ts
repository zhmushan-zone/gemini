import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { Report, ReportType } from './report.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReportService {

  save(reporterId: string, report: Report) {
    report.reporterId = reporterId;
    const obj = this.reportRepository.create(report);
    return this.reportRepository.save(obj);
  }

  async findByType(type: ReportType) {
    return this.reportRepository.find({ type });
  }

  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: MongoRepository<Report>
  ) { }
}
