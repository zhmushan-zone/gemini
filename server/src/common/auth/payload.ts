import { User } from '../../user/user.entity';

export class Payload extends User {
  username: string;
  jwtKey: string;

  constructor(payload: Payload) {
    super();
    this.username = payload.id;
    this.jwtKey = payload.jwtKey;
  }
}
