import * as koaRouter from 'koa-router'
import { UserController } from '../controllers'

export const userRouter = new koaRouter({ prefix: '/api/users' })

userRouter
  .post('/login', UserController.login)
  .post('/register', UserController.register)
  .get('/auth', UserController.auth)
