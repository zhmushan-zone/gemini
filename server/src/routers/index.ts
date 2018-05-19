import * as koaRouter from 'koa-router'
import { userRouter } from './user'
import { videoRouter } from './video'

export const router = new koaRouter()

router
    .use(userRouter.routes())
    .use(videoRouter.routes())
