import {Course, CourseDifficulty, CourseDirection, CourseType, Section} from '../course.entity';

export class CourseVO extends Course {
  id: string;
  title: string;
  coverImg: string;
  direction: CourseDirection;
  type: CourseType[];
  difficulty: CourseDifficulty;
  price: number;
  sections: Section[];
  authorId: string;

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
