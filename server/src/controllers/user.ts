import { Context } from 'koa'
import { IUser } from '../models'
import { UserService } from '../services'
import { CustomError } from '../error'
import { ResultCode, ResultVO } from '../vo'
import { verifyToken } from '../utils'

export class UserController {
  static async login(ctx: Context) {
    const req: IUser = ctx.request.body

    try {
      const user = await UserService.findByUsernameAndPassword(
        req.username,
        req.password,
      )
      if (!user) { throw new CustomError(ResultCode.LOGIN_FAILED, '用户名或密码错误') }
      const userVO = await UserService.refreshToken(user._id, user.tokenSecret)

      ctx.body = ResultVO.success(userVO)
    } catch (err) {
      ctx.body = new ResultVO(err.code || ResultCode.UNKNOWN, err.message)
    }
  }

  static async register(ctx: Context) {
    const req: IUser = ctx.request.body

    try {
      const user = await UserService.createOne({
        username: req.username,
        password: req.password,
      } as IUser)
      const userVO = await UserService.refreshToken(user._id, user.tokenSecret)

      ctx.body = ResultVO.success(userVO)
    } catch (err) {
      ctx.body = new ResultVO(err.code || ResultCode.UNKNOWN, err.message)
    }
  }

  static async auth(ctx: Context) {
    const { token, id } = ctx.request.headers

    try {
      const user = await UserService.findById(id)
      if (!user) { throw new CustomError(ResultCode.TOKEN_EXPIRED, 'token已失效') }
      verifyToken(token, user.tokenSecret)
      const userVO = await UserService.refreshToken(user._id, user.tokenSecret)

      ctx.body = ResultVO.success(userVO)
    } catch (err) {
      ctx.body = new ResultVO(err.code || ResultCode.UNKNOWN, err.message)
    }
  }
}
