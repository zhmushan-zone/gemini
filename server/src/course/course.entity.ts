import { Column, Entity, Index, ObjectIdColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { BaseEntity } from '../common/base.entity';

@Entity()
export class Course extends BaseEntity {

  @Index({ unique: true })
  @Column()
  title: string;

  @Column()
  desc: string;

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

  @Column()
  commentsId: string[];

  @Column()
  joinersId: string[];

  @Column()
  rate: {}; // userId: rate

  @Column()
  rateComment: {}; // userId: rateComment

  @BeforeInsert()
  beforeInsert() {
    super.beforeInsert();
    if (!this.title) this.title = '';
    if (!this.desc) this.desc = '';
    if (!this.coverImg) this.coverImg = '';
    if (!this.direction) this.direction = 0;
    if (!this.type) this.type = [];
    if (!this.difficulty) this.difficulty = 0;
    if (!this.price) this.price = 0;
    if (!this.sections) this.sections = [];
    if (!this.authorId) this.authorId = '';
    if (!this.commentsId) this.commentsId = [];
    if (!this.joinersId) this.joinersId = [];
    if (!this.rate) this.rate = {};
    if (!this.rateComment) this.rateComment = {};
  }

  @BeforeUpdate()
  beforeUpdate() {
    super.beforeUpdate();
  }
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
