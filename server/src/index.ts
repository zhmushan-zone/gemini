import * as koa from 'koa'
import * as mongoose from 'mongoose'
import * as koaStatic from 'koa-static'
import * as path from 'path'
import { router } from './routers'
const koaBody = require('koa-body')

mongoose.connect('mongodb://localhost/gemini', { config: { autoIndex: false } })

const app = new koa()

app.use(koaStatic(path.join(__dirname, '../public')))
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: '3000 * 1024 * 1024',
    uploadDir: path.join(__dirname, '../private'),
  },
}))
app.use(router.routes())

app.listen(9999)
console.log('run 9999')
