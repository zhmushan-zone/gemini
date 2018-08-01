import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index
} from 'typeorm';

@Entity()
export class User {

  @ObjectIdColumn()
  id: string;

  @Column()
  @Index({ unique: true })
  username: string;

  @Column()
  nickname: string;

  @Column()
  @Index({ unique: true })
  email: string;

  @Column()
  avatar: string;

  @Column()
  password: string;

  @Column()
  job: string;

  @Column()
  city: string;

  @Column()
  sex: Sex;

  @Column()
  watchTags: WatchTag[];

  @Column()
  signature: string;

  @Column()
  role: UserRole;

  @Column()
  salt: string;

  @Column()
  jwtKey: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export const enum UserRole {
  USER,
  ADMIN
}

export enum Sex {
  MALE,
  FEMALE,
  UNKNOW
}

export enum WatchTag {
  Javascript,
  NodeJs,
  Vue,
  React,
  Html5,
  HtmlCSS,
  Angular,
  WebApp,
  Jquery,
  Bootstrap,
  前端工具,
  CSS3,
  SassLess,
  Java,
  Python,
  Go,
  PHP,
  C,
  Cpp,
  CSharp,
  MySQL,
  SQLServer,
  Oracle,
  MongoDB,
  Android,
  iOS,
  Unity3D,
  Cocos2dx,
  大数据,
  云计算,
  深度学习,
  机器学习,
  测试,
  linux,
  Photoshop,
  Maya,
  Premiere,
  ZBrush,
  数据结构,
  Ruby
}
