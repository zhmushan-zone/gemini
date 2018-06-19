import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {UserController} from './user.controller';
import {User} from './user.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CommonModule} from '../common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CommonModule
  ],
  providers: [
    UserService
  ],
  controllers: [UserController]
})
export class UserModule {
}
