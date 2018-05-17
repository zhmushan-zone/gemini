import { UserRole, IUser } from '../models'

export class UserVO {
  id: string
  username: string
  nickname: string
  job: string
  city: string
  sex: string
  signature: string
  role: UserRole
  token?: string

  constructor(user: IUser | UserVO) {
    this.id = user.id
    this.username = user.username
    this.nickname = user.nickname
    this.job = user.job
    this.city = user.city
    this.sex = user.sex
    this.signature = user.signature
    this.role = user.role
  }
}
