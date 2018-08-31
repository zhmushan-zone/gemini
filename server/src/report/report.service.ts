import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { Report, ReportType } from './report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GeminiError } from '../common/error';
import { ResponseCode } from '../common/utils';

@Injectable()
export class ReportService {

  save(reporterId: string, report: Report) {
    report.reporterId = reporterId;
    const obj = this.reportRepository.create(report);
    return this.reportRepository.save(obj);
  }

  findById(id: string) {
    return this.reportRepository.findOne(id);
  }

  findAll() {
    return this.reportRepository.find();
  }

  async findByType(type: ReportType) {
    return this.reportRepository.find({ type });
  }

  async updateByIdWithAdmin(id: string, report: Report) {
    const doc = await this.reportRepository.findOne(id);
    if (!doc) return new GeminiError(ResponseCode.NOT_EXISIT);
    for (const key in report) doc[key] = report[key];
    return this.reportRepository.save(doc);
  }

  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: MongoRepository<Report>
  ) { }
}
