import { Context } from 'koa'
import { IUser, IFile, IVideo } from '../models'
import { ResultVO, ResultCode, VideoVO } from '../vo'
import * as path from 'path'
import * as fs from 'fs'
import { isVideo } from '../utils'
import { VideoService } from '../services'

export class VideoController {
  static async createOne(ctx: Context) {
    const user: IUser = ctx.state.user
    const files: { [index: string]: IFile } = ctx.request.body.files

    try {
      const res = []
      for (const key in files) {
        const file = files[key]
        const name = path.basename(file.path)
        const ext = path.extname(file.name)
        if (!isVideo(ext)) {
          fs.unlinkSync(file.path)
          res.push(ResultCode.EXTNAME_ERR)
        } else {
          fs.renameSync(file.path, path.join(file.path, 'videos'))
          const video = await VideoService.createOne({ userId: user.id, name })
          res.push(new VideoVO(video))
        }
      }
      ctx.body = ResultVO.success(res)
    } catch (err) {
      ctx.body = new ResultVO(err.code || ResultCode.UNKNOWN, err.message)
    }
  }

  static async fetchAll(ctx: Context) {
    try {
      const videos: IVideo[] = await VideoService.fetchAll()
      ctx.body = ResultVO.success(videos.map(v => new VideoVO(v)))
    } catch (err) {
      ctx.body = new ResultVO(err.code || ResultCode.UNKNOWN, err.message)
    }
  }
}
