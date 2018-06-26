import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { config } from '../../config';
import { UserService } from '../../user/user.service';
import { Payload } from './payload';
import { User } from '../../user/user.entity';

@Injectable()
export class AuthService {

  generateToken(username: string, jwtKey: string) {
    return jwt.sign({ username, jwtKey }, config.token.secret, { expiresIn: config.token.expiresIn });
  }

  validate(payload: Payload) {
    return this.userService.findOne({
      username: payload.username,
      jwtKey: payload.jwtKey
    } as User);
  }

  constructor(
    private readonly userService: UserService
  ) { }
}
