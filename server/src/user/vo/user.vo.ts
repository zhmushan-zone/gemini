import { User } from '../user.entity';

export class UserVO extends User {
  token: string;

  constructor(user: User, token?: string) {
    super();
    this.id = user.id;
    this.username = user.username;
    this.nickname = user.nickname;
    this.email = user.email;
    this.avatar = user.avatar;
    this.city = user.city;
    this.sex = user.sex;
    this.signature = user.signature;
    this.watchTags = user.watchTags;
    this.watchIssuesId = user.watchIssuesId;
    this.role = user.role;
    this.createAt = user.createAt;
    this.updateAt = user.updateAt;
    this.token = token;
  }
}
