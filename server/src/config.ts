import * as path from 'path'

export namespace config {
  export const DB_NAME = 'mongodb://localhost/gemini'
  export const PUBLIC_PATH = path.join(__dirname, '../public')
  export const UPLOAD_PATH = path.join(__dirname, '../private')
  export const VIDEOS_PATH = path.join(UPLOAD_PATH, 'videos')
  export const UPLOAD_MAX_FILE_SIZE = '3000 * 1024 * 1024'
  export const PORT = 9999
}
