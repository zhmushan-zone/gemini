import {Test, TestingModule} from '@nestjs/testing';
import {CourseController} from './course.controller';
import {CommonModule} from '../common/common.module';
import {CourseService} from './course.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Course, CourseDifficulty, CourseDirection, CourseType} from './course.entity';
import {config} from '../config';
import {User} from '../user/user.entity';
import {success} from '../common/utils';

const course: Course = {
  id: 'id',
  sections: [],
  authorId: 'authorId',
  title: 'title',
  direction: CourseDirection.BACKEND,
  type: [CourseType.CSS3],
  difficulty: CourseDifficulty.ADVANCED,
  price: 0,
  coverImg: 'coverImg'
};

describe('Course Controller', () => {
  let module: TestingModule;
  let controller: CourseController;
  let service: CourseService;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(config.typeorm),
        TypeOrmModule.forFeature([Course]),
        CommonModule
      ],
      controllers: [CourseController],
      providers: [
        CourseService
      ]
    }).compile();
    controller = module.get<CourseController>(CourseController);
    service = module.get<CourseService>(CourseService);
  });
  it('create', async () => {
    jest.spyOn(service, 'create').mockImplementation(() => course);
    expect(await controller.create({id: 'authorId'} as User, course)).toEqual(success(course));
  });
});
