import { UserRole, IUser } from '../models'

export class UserVO {
  id: string
  username: string
  nickname: string
  job: string
  role: UserRole
  token?: string

  constructor(user: IUser | UserVO) {
    this.id = user.id
    this.username = user.username
    this.nickname = user.nickname
    this.job = user.job
    this.role = user.role
  }
}
