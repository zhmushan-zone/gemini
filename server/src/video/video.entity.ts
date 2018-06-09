import { Entity, ObjectIdColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Video {

  @ObjectIdColumn()
  id: string;

  @ManyToOne(type => User, user => user.videos)
  user: User;

  @Column()
  name: string;

  constructor(user?: User, name?: string) {
    this.user = user;
    this.name = name;
  }
}
