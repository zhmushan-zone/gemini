import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common/common.module';
import { Tag } from '../tag/tag.entity';
import { TagService } from '../tag/tag.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Tag]),
    CommonModule
  ],
  providers: [
    UserService,
    TagService
  ],
  controllers: [UserController]
})
export class UserModule {
}
