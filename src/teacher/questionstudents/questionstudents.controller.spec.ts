import { Test, TestingModule } from '@nestjs/testing';
import { QuestionstudentsController } from './questionstudents.controller';
import { QuestionstudentsService } from './questionstudents.service';

describe('QuestionstudentsController', () => {
  let controller: QuestionstudentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionstudentsController],
      providers: [QuestionstudentsService],
    }).compile();

    controller = module.get<QuestionstudentsController>(QuestionstudentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
