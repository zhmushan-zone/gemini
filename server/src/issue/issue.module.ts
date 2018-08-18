import { Module } from '@nestjs/common';
import { IssueController } from './issue.controller';
import { IssueService } from './issue.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Issue, Reply, SubReply } from './issue.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Issue, Reply, SubReply])
  ],
  controllers: [IssueController],
  providers: [IssueService]
})
export class IssueModule {}
