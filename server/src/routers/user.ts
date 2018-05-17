import * as koaRouter from 'koa-router'
import { UserController } from '../controllers'
import { userAuth } from '../utils/auth'

export const userRouter = new koaRouter({ prefix: '/api/users' })

userRouter
  .post('/login', UserController.login)
  .post('/register', UserController.register)
  .get('/auth', userAuth, UserController.auth)
  // .put('/password', UserController.)
  .put('/', userAuth, UserController.updateOne)
  .get('/', userAuth, UserController.fetchAll)
