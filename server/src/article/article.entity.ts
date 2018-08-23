import { Entity, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import { BaseEntity } from '../common/base.entity';

@Entity()
export class Article extends BaseEntity {

  @Column()
  title: string;

  @Column()
  coverImg: string;

  @Column()
  type: ArticleType[];

  @Column()
  content: string;

  @Column()
  authorId: string;

  @Column()
  upersId: string[];

  @Column()
  commentsId: string[];

  @Column()
  category: ArticleCategory;

  @BeforeInsert()
  beforeInsert() {
    super.beforeInsert();
    if (!this.title) this.title = '';
    if (!this.coverImg) this.coverImg = '';
    if (!this.type) this.type = [];
    if (!this.content) this.content = '';
    if (!this.authorId) this.authorId = '';
    if (!this.upersId) this.upersId = [];
    if (!this.commentsId) this.commentsId = [];
    if (!this.category) this.category = 0;
  }

  @BeforeUpdate()
  beforeUpdate() {
    super.beforeUpdate();
  }
}

@Entity()
export class Comment extends BaseEntity {

  @Column()
  content: string;

  @Column()
  authorId: string;

  @Column()
  commentsId: string[];

  @BeforeInsert()
  beforeInsert() {
    super.beforeInsert();
    if (!this.content) this.content = '';
    if (!this.authorId) this.authorId = '';
    if (!this.commentsId) this.commentsId = [];
  }

  @BeforeUpdate()
  beforeUpdate() {
    super.beforeUpdate();
  }
}

export enum ArticleType {
  JAVASCRIPT,
  NODEJS,
  VUE,
  REACT,
  ANGULAR,
  html,
  css,
  jquery,
  bootstrap,
  前端工具,
  sass,
  less,
  java,
  python,
  go,
  php,
  ruby,
  thinkphp,
  c,
  cpp,
  spring,
  Yli,
  算法,
  数据库,
  android,
  ios,
  大数据,
  人工智能,
  机器学习,
  产品,
  设计
}

export enum ArticleCategory {
  '资讯',
  '区块链',
  '人工智能',
  '云计算/大数据',
  '前端开发',
  '后端开发',
  '移动互联',
  '工具资源',
  '职场生活',
  '幽默段子',
  '其他'
}
