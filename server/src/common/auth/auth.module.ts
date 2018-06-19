import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {JwtStrategy} from './jwt.strategy';
import {User} from '../../user/user.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserService} from '../../user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  providers: [UserService, AuthService, JwtStrategy],
  exports: [
    AuthService
  ]
})
export class AuthModule {
}
