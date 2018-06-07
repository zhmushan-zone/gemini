import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common/common.module';
import { AuthService } from '../common/auth/auth.service';
import { JwtStrategy } from '../common/auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  providers: [
    UserService,
    AuthService,
    JwtStrategy
  ],
  controllers: [UserController]
})
export class UserModule { }
