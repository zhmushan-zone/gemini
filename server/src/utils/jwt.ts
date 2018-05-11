import * as jwt from 'jsonwebtoken'
import { UserVO, ResultCode } from '../vo'
import { CustomError } from '../error'

export const generateToken = (user: string, secret: string) =>
  jwt.sign(JSON.parse(user), secret, {
    expiresIn: '7 days',
  })

export const verifyToken = (token: string, secret: string) => {
  try {
    return jwt.verify(token, secret) as UserVO
  } catch (err) {
    throw new CustomError(ResultCode.TOKEN_EXPIRED, 'token已失效')
  }
}
