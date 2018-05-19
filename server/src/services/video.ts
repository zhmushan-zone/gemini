import { Video } from '../models'
import { VideoVO } from '../vo'

export class VideoService {
  static createOne(video: VideoVO) {
    return new Video(video).save()
  }

  static fetchAll() {
    return Video.find()
  }
}
