import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { config } from '../../config';
import { Payload } from './payload';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  async validate(payload: Payload, done) {
    const user = await this.authService.validate(payload);
    if (!user) {
      return done(new UnauthorizedException(), false);
    }
    done(null, user);
  }

  constructor(
    private readonly authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('token'),
      secretOrKey: config.token.secret
    });
  }
}
