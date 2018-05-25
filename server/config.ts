import * as path from 'path'
import * as fs from 'fs'

export namespace config {
  export const DB_NAME = 'mongodb://localhost/gemini'
  export const DB_NAME_TEST = 'mongodb://localhost/gemini_test'
  export const PUBLIC_PATH = path.join(__dirname, '../public')
  export const UPLOAD_PATH = path.join(__dirname, '../private')
  export const VIDEOS_PATH = path.join(UPLOAD_PATH, 'videos')
  export const AVATARS_PATH = path.join(UPLOAD_PATH, 'avatars')
  export const UPLOAD_MAX_FILE_SIZE = '3000 * 1024 * 1024'
  export const PORT = 9999

  export const initDir = () => {
    if (!fs.existsSync(PUBLIC_PATH)) { fs.mkdir(PUBLIC_PATH, err => { if (err) { console.log(err) } }) }
    if (!fs.existsSync(UPLOAD_PATH)) { fs.mkdir(UPLOAD_PATH, err => { if (err) { console.log(err) } }) }
    if (!fs.existsSync(VIDEOS_PATH)) { fs.mkdir(VIDEOS_PATH, err => { if (err) { console.log(err) } }) }
    if (!fs.existsSync(AVATARS_PATH)) { fs.mkdir(AVATARS_PATH, err => { if (err) { console.log(err) } }) }
  }
}
