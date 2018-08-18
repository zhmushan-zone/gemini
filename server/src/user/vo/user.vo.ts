import { User } from '../user.entity';

export class UserVO extends User {
  token: string;

  constructor(user: User, token?: string) {
    super();
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.avatar = user.avatar;
    this.city = user.city;
    this.sex = user.sex;
    this.signature = user.signature;
    this.role = user.role;
    this.watchTags = user.watchTags;
    this.token = token;
  }
}
