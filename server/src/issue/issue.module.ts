import { Module } from '@nestjs/common';
import { IssueController } from './issue.controller';
import { IssueService } from './issue.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Issue } from './issue.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Issue])
  ],
  controllers: [IssueController],
  providers: [IssueService]
})
export class IssueModule {}
