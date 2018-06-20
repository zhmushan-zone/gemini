import {Column, Entity, ObjectIdColumn} from 'typeorm';
import {User} from '../user/user.entity';

@Entity()
export class Course {

  @ObjectIdColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  coverImg: string;

  @Column()
  direction: CourseDirection;

  @Column()
  type: CourseType[];

  @Column()
  difficulty: CourseDifficulty;

  @Column()
  price: number;

  @Column()
  sections: Section[];

  @Column()
  authorId: string;
}

export class Section {
  title: string;
  nodes: Node[];
}

export class Node {
  title: string;
  video: string;
}

export enum CourseDirection {
  BACKEND,
  FRONTEND
}

export enum CourseType {
  HTML,
  CSS,
  JAVASCRIPT
}

export enum CourseDifficulty {
  GETTING_STARTED,
  BEGINNER,
  INTERMEDIATE,
  ADVANCED
}
