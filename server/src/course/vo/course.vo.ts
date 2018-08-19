import { Course } from '../course.entity';

export class CourseVO extends Course {

  constructor(course: Course) {
    super();
    this.id = course.id;
    this.title = course.title;
    this.coverImg = course.coverImg;
    this.direction = course.direction;
    this.type = course.type;
    this.difficulty = course.difficulty;
    this.price = course.price;
    this.sections = course.sections;
    this.authorId = course.authorId;
  }
}
