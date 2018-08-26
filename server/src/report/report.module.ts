import { Report } from './report.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Report]),
    CommonModule
  ],
  controllers: [],
  providers: []
})
export class IssueModule { }
