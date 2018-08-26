import { Report } from './report.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common/common.module';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Report]),
    CommonModule
  ],
  controllers: [
    ReportController
  ],
  providers: [
    ReportService
  ]
})
export class ReportModule { }
