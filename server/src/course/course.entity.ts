import {Column, Entity, ManyToOne, ObjectIdColumn} from 'typeorm';
import {User} from '../user/user.entity';

@Entity()
export class Course {
  @ObjectIdColumn()
  id: string;

  @Column()
  title: string;

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

  @ManyToOne(type => User, user => user.courses)
  author: User;
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
