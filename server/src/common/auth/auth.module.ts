import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  providers: [AuthService, JwtStrategy],
  exports: [
    AuthService,
    JwtStrategy
  ]
})
export class AuthModule {}
