import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index
} from 'typeorm';
import { Tag } from '../tag/tag.entity';

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
  whatchTags: Set<Tag>;

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
