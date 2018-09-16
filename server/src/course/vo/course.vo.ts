import { Course } from '../course.entity';

export class CourseVO extends Course {

  authorUsername: string;
  authorAvatar: string;
  authorJob: string;
  authorSignature: string;

  constructor(course: Course) {
    super();
    this.id = course.id;
    this.title = course.title;
    this.desc = course.desc;
    this.coverImg = course.coverImg;
    this.direction = course.direction;
    this.type = course.type;
    this.difficulty = course.difficulty;
    this.price = course.price;
    this.sections = course.sections;
    this.authorId = course.authorId;
    this.joinersId = course.joinersId;
    this.rate = course.rate;
    this.rateComment = course.rateComment;
    this.commentsId = course.commentsId;
    this.updateAt = course.updateAt;
    this.createAt = course.createAt;
  }
}
