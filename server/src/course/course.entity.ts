import { Column, Entity, Index, ObjectIdColumn } from 'typeorm';

@Entity()
export class Course {

  @ObjectIdColumn()
  id: string;

  @Index({ unique: true })
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
  FRONTEND,
  BACKEND,
  MOBILE,
  DATABASE,
  CLOUDCOMPUTING_BIGDATA,
  YUNWEI_TEST,
  UI
}

export enum CourseType {
  HTML5,
  CSS3,
  JAVASCRIPT,
  JQUERY,
  NODEJS,
  BOOTSTRAP,
  SASS_LESS,
  VUE,
  REACT,
  ANGULAR,
  PHP,
  JAVA,
  SPRINGBOOT,
  PYTHON,
  C,
  CPP,
  GO,
  CSHARP,
  RUBY,
  ANDROID,
  IOS,
  UNITY3D,
  COCOS2DX,
  MYSQL,
  ORACLE,
  MONGODB,
  SQLSERVER,
  BIGDATA,
  CLOUDCOMPUTING,
  TEST,
  LINUX,
  ANIMATION,
  APPUIDESIGN,
  DESIGNTOOLS,
  DESIGNBASIS
}

export enum CourseDifficulty {
  BASIS,
  MIDDLE,
  ADVANCED
}
