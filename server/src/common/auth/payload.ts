import { User } from '../../user/user.entity';

export class Payload {
  username: string;
  jwtKey: string;
  iat: number;
  exp: number;
}
