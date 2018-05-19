import * as koaRouter from 'koa-router'
import { VideoController } from '../controllers'
import { userAuth } from '../utils'

export const videoRouter = new koaRouter({ prefix: '/api/video' })

videoRouter
  .get('/', VideoController.fetchAll)
  .post('/', userAuth, VideoController.createOne)
