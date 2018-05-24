import { IVideo } from '../models/video'

export class VideoVO {
  id?: any
  userId: string
  name: string

  constructor(video: IVideo | VideoVO) {
    this.id = video.id
    this.userId = video.userId
    this.name = video.name
  }
}
