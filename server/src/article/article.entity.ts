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
  REACT
}
