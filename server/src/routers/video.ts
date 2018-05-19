import * as koaRouter from 'koa-router'
import { VideoController } from '../controllers/video'
import { userAuth } from '../utils'

export const videoRouter = new koaRouter({ prefix: '/api/video' })

videoRouter
  .post('/', userAuth, VideoController.createOne)
