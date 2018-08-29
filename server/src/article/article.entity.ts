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
	'JavaScript',
	'Node.js',
	'Vue',
	'React',
	'Html5',
	'Html/CSS',
	'Angular',
	'WebApp',
	'Jquery',
	'Bootstrap',
	'前端工具',
	'CSS3',
	'Sass/Less',
	'JAVA',
	'Python',
	'Go',
	'PHP',
	'C',
	'C++',
	'C#',
	'MySQL',
	'SQL Server',
	'Oracle',
	'MongoDB',
	'Android',
	'iOS',
	'Unity 3D',
	'Cocos2d-x',
	'大数据',
	'云计算',
	'深度学习',
	'机器学习',
	'测试',
	'Linux',
	'Photoshop',
	'Maya',
	'Premiere',
	'ZBrush',
	'数据结构',
	'Ruby'
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
