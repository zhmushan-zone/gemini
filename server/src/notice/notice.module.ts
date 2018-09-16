import { Module } from '@nestjs/common';
import { NoticeGateway } from './notice.gateway';
import { NoticeController } from './notice.controller';
import { AuthModule } from '../common/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notice } from './notice.entity';
import { NoticeService } from './notice.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Notice])],
  providers: [NoticeGateway, NoticeService],
  exports: [NoticeGateway, NoticeService]
})
export class NoticeModule {}
