import {
  Entity,
  Column,
  Index,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { ArticleType } from '../article/article.entity';

@Entity()
export class User extends BaseEntity {

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
  watchIssuesId: string[];

  @Column()
  signature: string;

  @Column()
  role: UserRole;

  @Column()
  salt: string;

  @Column()
  jwtKey: string;

  @Column()
  watchArticleTypes: ArticleType[];

  @Column()
  watchUsersId: string[];

  @Column()
  watchedUsersId: string[];

  @BeforeInsert()
  beforeInsert() {
    super.beforeInsert();
    if (!this.username) this.username = '';
    if (!this.nickname) this.nickname = '';
    if (!this.email) this.email = '';
    if (!this.avatar) this.avatar = '';
    if (!this.password) this.password = '';
    if (!this.job) this.job = '';
    if (!this.city) this.city = '';
    if (!this.sex) this.sex = Sex.UNKNOW;
    if (!this.watchTags) this.watchTags = [];
    if (!this.watchIssuesId) this.watchIssuesId = [];
    if (!this.signature) this.signature = '';
    if (!this.role) this.role = UserRole.USER;
    if (!this.salt) this.salt = '';
    if (!this.jwtKey) this.jwtKey = '';
    if (!this.watchArticleTypes) this.watchArticleTypes = [];
    if (!this.watchUsersId) this.watchUsersId = [];
    if (!this.watchedUsersId) this.watchedUsersId = [];
  }

  @BeforeUpdate()
  beforeUpdate() {
    super.beforeUpdate();
  }
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
