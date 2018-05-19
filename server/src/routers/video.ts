import * as koaRouter from 'koa-router'
import { VideoController } from '../controllers'
import { userAuth } from '../utils'

export const videoRouter = new koaRouter({ prefix: '/api/videos' })

videoRouter
  .get('/:id', VideoController.fetchOne)
  .get('/', VideoController.fetchAll)
  .post('/', userAuth, VideoController.createOne)
