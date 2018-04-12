import * as koa from 'koa'
import * as mongoose from 'mongoose'
import * as koaBodyparser from 'koa-bodyparser'
import { router } from './routers'

mongoose.connect('mongodb://localhost/gemini', { config: { autoIndex: false } })

const app = new koa()

app.use(koaBodyparser())

app.use(router.routes())

app.listen(3000)
console.log('run 3000')
