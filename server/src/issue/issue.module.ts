import { Module } from '@nestjs/common';
import { IssueController } from './issue.controller';
import { IssueService } from './issue.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Issue, Reply, SubReply } from './issue.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Issue, Reply, SubReply, User])
  ],
  controllers: [IssueController],
  providers: [IssueService, UserService]
})
export class IssueModule {}
