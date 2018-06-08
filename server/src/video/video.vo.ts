import { Video } from './video.entity';
import { User } from '../user/user.entity';
import { UserVO } from '../user/vo/user.vo';

export class VideoVO extends Video {
  id: string;
  name: string;
  user: User;

  constructor(video: Video) {
    super();
    this.id = video.id;
    this.name = video.name;
    if (video.user) {
      this.user = new UserVO(video.user);
    }
  }
}
