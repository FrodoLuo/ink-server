import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesController } from './articles.controller';

describe('Articles Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [ArticlesController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: ArticlesController = module.get<ArticlesController>(ArticlesController);
    expect(controller).toBeDefined();
  });
});
