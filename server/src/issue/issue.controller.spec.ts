import { Test, TestingModule } from '@nestjs/testing';
import { IssueController } from './issue.controller';

describe('Issue Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [IssueController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: IssueController = module.get<IssueController>(IssueController);
    expect(controller).toBeDefined();
  });
});
