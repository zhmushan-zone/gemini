import * as koaRouter from 'koa-router'
import { userRouter } from './user'

export const router = new koaRouter()

router
    .use(userRouter.routes())
