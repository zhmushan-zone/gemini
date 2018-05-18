import * as jwt from 'jsonwebtoken'
import { UserVO, ResultCode } from '../vo'
import { CustomError } from '../error'
import { IUser } from '../models'

export const generateToken = (user: IUser | UserVO, secret: string) =>
  jwt.sign(generateSubject(user), secret, {
    expiresIn: '7 days',
  })

export const verifyToken = (token: string, secret: string) => {
  try {
    return jwt.verify(token, secret) as UserVO
  } catch (err) {
    throw new CustomError(ResultCode.TOKEN_EXPIRED, 'token已失效')
  }
}

const generateSubject = (user: IUser | UserVO) => ({
  id: user.id,
  username: user.username,
  role: user.role,
} as UserVO)
