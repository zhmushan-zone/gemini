import {
  Entity,
  ObjectIdColumn,
  ObjectID, Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToMany
} from 'typeorm';
import { Video } from '../video/video.entity';

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
  signature: string;

  @Column()
  role: UserRole;

  @Column()
  salt: string;

  @Column()
  jwtKey: string;

  @OneToMany(type => Video, video => video.user)
  videos: Video[];

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
