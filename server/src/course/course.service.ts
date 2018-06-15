import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Course} from './course.entity';
import {MongoRepository} from 'typeorm';
import {User} from '../user/user.entity';

@Injectable()
export class CourseService {

  create(author: User, course: Course) {
    course.author = author;
    return this.courseRepository.save(course);
  }

  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: MongoRepository<Course>
  ) {
  }
}
