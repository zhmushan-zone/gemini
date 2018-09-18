import { Module } from '@nestjs/common';
import { IssueController } from './issue.controller';
import { IssueService } from './issue.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Issue, Reply, SubReply } from './issue.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Issue, Reply, SubReply, User]),
    CommonModule
  ],
  controllers: [IssueController],
  providers: [IssueService, UserService],
  exports: [IssueService]
})
export class IssueModule { }
