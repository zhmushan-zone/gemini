import { Context } from 'koa'
import { UserService } from '../services'
import { CustomError } from '../error'
import { ResultCode, ResultVO } from '../vo'
import { verifyToken } from '.'

export const userAuth = async (ctx: Context, next: () => Promise<any>) => {
  const { token, id } = ctx.request.headers

  try {
    const user = await UserService.findById(id)
    if (!user) { throw new CustomError(ResultCode.ID_INVALID, '无效的ID') }
    verifyToken(token, user.tokenSecret)
    ctx.state.user = user
    await next()
  } catch (err) {
    ctx.body = new ResultVO(err.code || ResultCode.UNKNOWN, err.message)
  }
}
