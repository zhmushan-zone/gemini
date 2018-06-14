import {Entity, ObjectIdColumn} from 'typeorm';

@Entity()
export class Course {
  @ObjectIdColumn()
  id: string;
}

export enum CourseDirection {

}

export enum CourseType {

}

export enum CourseDifficulty {

}
