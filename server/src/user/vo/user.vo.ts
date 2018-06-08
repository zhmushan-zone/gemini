import { User, Sex, UserRole } from '../user.entity';

export class UserVO extends User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  city: string;
  sex: Sex;
  signature: string;
  role: UserRole;
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
    this.token = token;
  }
}
