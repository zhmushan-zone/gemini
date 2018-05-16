import { Context } from 'koa'
import { IUser, UserRole } from '../models'
import { UserService } from '../services'
import { CustomError } from '../error'
import { ResultCode, ResultVO, UserVO } from '../vo'

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
    const user: IUser = ctx.state.user

    try {
      const userVO = await UserService.refreshToken(user._id, user.tokenSecret)

      ctx.body = ResultVO.success(userVO)
    } catch (err) {
      ctx.body = new ResultVO(err.code || ResultCode.UNKNOWN, err.message)
    }
  }

  static async updateOne(ctx: Context) {
    const user: IUser = ctx.state.user
    const { nickname, job } = ctx.request.body

    try {
      const res = await UserService.updateOne(user, { nickname, job } as IUser)
      if (!res.ok) { throw new CustomError(ResultCode.UPDATE_FAILED, '更新失败') }
      ctx.body = ResultVO.success()
    } catch (err) {
      ctx.body = new ResultVO(err.code || ResultCode.UNKNOWN, err.message)
    }
  }

  static async fetchAll(ctx: Context) {
    const user: IUser = ctx.state.user

    try {
      switch (user.role) {
        case UserRole.USER:
          throw new CustomError(ResultCode.NO_PERMISSION, '没有权限')
        case UserRole.ADMIN:
          const users = await UserService.findAll()

          ctx.body = ResultVO.success(users.map(v => new UserVO(v)))
          break
      }
    } catch (err) {
      ctx.body = new ResultVO(err.code || ResultCode.UNKNOWN, err.message)
    }
  }
}
