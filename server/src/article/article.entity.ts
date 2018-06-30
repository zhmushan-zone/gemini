import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class Article {

  @ObjectIdColumn()
  id: string;

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
