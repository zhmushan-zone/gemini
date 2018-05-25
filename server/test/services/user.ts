import test from 'ava'
import * as mongoose from 'mongoose'
import { config } from '../../config'

mongoose.connect(config.DB_NAME_TEST, { config: { autoIndex: false } })

test('createOne', t => {
  t.pass()
})
