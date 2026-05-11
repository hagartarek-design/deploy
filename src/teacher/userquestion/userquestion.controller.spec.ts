import { Test, TestingModule } from '@nestjs/testing';

import { UserquestionController } from './userquestion.controller';
import { UserquestionService } from './userquestion.service';

describe('UserquestionController', () => {
  let controller: UserquestionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserquestionController],
      providers: [UserquestionService],
    }).compile();

    controller = module.get<UserquestionController>(UserquestionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
