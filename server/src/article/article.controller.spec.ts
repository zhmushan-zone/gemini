import { Test, TestingModule } from '@nestjs/testing';
import { ArticleController } from './article.controller';

describe('Article Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [ArticleController]
    }).compile();
  });
  it('should be defined', () => {
    const controller: ArticleController = module.get<ArticleController>(ArticleController);
    expect(controller).toBeDefined();
  });
});
