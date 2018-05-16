import { UserRole, IUser } from '../models'

export class UserVO {
  id: string
  username: string
  nickname: string
  role: UserRole
  token?: string

  constructor(user: IUser | UserVO) {
    this.id = user.id
    this.username = user.username
    this.nickname = user.nickname
    this.role = user.role
  }
}
