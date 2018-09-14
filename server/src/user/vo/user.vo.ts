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
    this.job = user.job;
    this.city = user.city;
    this.sex = user.sex;
    this.signature = user.signature;
    this.watchTags = user.watchTags;
    this.watchArticleTypes = user.watchArticleTypes;
    this.watchIssuesId = user.watchIssuesId;
    this.watchUsersId = user.watchUsersId;
    this.watchedUsersId = user.watchedUsersId;
    this.role = user.role;
    this.joinCourse = user.joinCourse;
    this.createAt = user.createAt;
    this.updateAt = user.updateAt;
    this.token = token;
  }
}
