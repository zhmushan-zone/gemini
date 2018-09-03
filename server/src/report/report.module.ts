import { Report } from './report.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common/common.module';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Report]),
    CommonModule,
    UserModule
  ],
  controllers: [
    ReportController
  ],
  providers: [
    ReportService
  ]
})
export class ReportModule { }
