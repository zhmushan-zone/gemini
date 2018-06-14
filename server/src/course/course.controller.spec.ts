import { Test, TestingModule } from '@nestjs/testing';
import { CourseController } from './course.controller';

describe('Course Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [CourseController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: CourseController = module.get<CourseController>(CourseController);
    expect(controller).toBeDefined();
  });
});
