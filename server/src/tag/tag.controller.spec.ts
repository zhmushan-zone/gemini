import { Test, TestingModule } from '@nestjs/testing';
import { TagController } from './tag.controller';

describe('Tag Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [TagController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: TagController = module.get<TagController>(TagController);
    expect(controller).toBeDefined();
  });
});
