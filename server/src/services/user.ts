import { User, IUser } from '../models'
import { encrpty, generateToken, generateSalt } from '../utils'
import { UserVO, ResultCode } from '../vo'
import { CustomError } from '../error'

export class UserService {
  static async createOne(user: IUser) {
    try {
      user.salt = generateSalt()
      user.password = encrpty(user.password, user.salt)

      return await new User(user).save()
    } catch (err) {
      throw new CustomError(ResultCode.USERNAME_EXISIT, '用户名已存在')
    }
  }

  static async findByUsernameAndPassword(username: string, password: string) {
    const user = await User.findOne({ username })
    if (user && !(encrpty(password, user.salt) === user.password)) {
      return null
    }

    return user
  }

  static findById(id: string) {
    return User.findById(id)
  }

  static async refreshToken(id: string, tokenSecret: string) {
    tokenSecret = generateSalt()
    const user = await this.updateById(id, { tokenSecret } as IUser) as IUser
    user.tokenSecret = tokenSecret
    const userVO = new UserVO(user)
    userVO.token = generateToken(JSON.stringify(userVO), user.tokenSecret)

    return userVO
  }

  static updateById(id: string, user: IUser) {
    return User.findByIdAndUpdate(id, user)
  }

  static updateOne(user: IUser, update: IUser) {
    return User.updateOne(user, update)
  }

  static changePassword(id: string, password: string) {
    const salt = generateSalt()
    password = encrpty(password, salt)

    return this.updateById(id, { password, salt } as IUser)
  }

  static findAll() {
    return User.find()
  }
}
