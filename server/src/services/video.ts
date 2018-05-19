import { Video } from '../models/video'
import { VideoVO } from '../vo'

export class VideoService {
  static createOne(video: VideoVO) {
    return new Video(video).save()
  }
}
