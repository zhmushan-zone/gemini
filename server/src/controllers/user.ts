import { Context } from 'koa'
import { IUser, UserRole, IFile } from '../models'
import { UserService } from '../services'
import { CustomError } from '../error'
import { ResultCode, ResultVO, UserVO } from '../vo'
import { isImg } from '../utils'
import * as path from 'path'
import * as fs from 'fs'
import { config } from '../config'

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
    const { nickname, job, city, sex, signature } = ctx.request.body
    const updateUser = {} as IUser
    if (nickname) { updateUser.nickname = nickname }
    if (job) { updateUser.job = job }
    if (city) { updateUser.city = city }
    if (sex) { updateUser.sex = sex }
    if (signature) { updateUser.signature = signature }

    try {
      const res = await UserService.updateOne(user, updateUser)
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

  static async createAvatar(ctx: Context) {
    const user: IUser = ctx.state.user
    const { avatar }: { [index: string]: IFile } = ctx.request.body.files

    try {
      const name = path.basename(avatar.path)
      const ext = path.extname(avatar.name)
      if (!isImg(ext)) { fs.unlink(avatar.path, err => console.log(err)) }
      else {
        fs.renameSync(avatar.path, path.join(config.AVATARS_PATH, name))
        const res = await UserService.updateOne(user, { avatar: name } as IUser)
        if (!res.ok) { throw new CustomError(ResultCode.UPDATE_FAILED, '更新失败') }
        if (user.avatar) { fs.unlink(path.join(config.AVATARS_PATH, user.avatar), err => console.log(err)) }
        ctx.body = ResultVO.success(name)
      }
    } catch (err) {
      ctx.body = new ResultVO(err.code || ResultCode.UNKNOWN, err.message)
    }
  }

  static fetchAvatar(ctx: Context) {
    const { name } = ctx.params

    const avatarPath = path.join(config.AVATARS_PATH, name)
    try {
      if (!fs.existsSync(avatarPath)) { throw new CustomError(ResultCode.FILE_NOT_EXISIT, '文件不存在') }
      const stream = fs.createReadStream(avatarPath)
      stream.on('error', () => stream.close())
      ctx.body = stream.pipe(ctx.res)
    } catch (err) {
      ctx.body = new ResultVO(err.code || ResultCode.UNKNOWN, err.message)
    }
  }
}
