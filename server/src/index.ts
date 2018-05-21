import * as koa from 'koa'
import * as mongoose from 'mongoose'
import * as koaStatic from 'koa-static'
import { router } from './routers'
import { config } from './config'
const koaBody = require('koa-body')

config.initDir()
mongoose.connect(config.DB_NAME, { config: { autoIndex: false } })

const app = new koa()

app.use(koaStatic(config.PUBLIC_PATH))
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: config.UPLOAD_MAX_FILE_SIZE,
    uploadDir: config.UPLOAD_PATH,
  },
}))
app.use(router.routes())
app.listen(config.PORT)
console.log(`run as ${config.PORT}`)
