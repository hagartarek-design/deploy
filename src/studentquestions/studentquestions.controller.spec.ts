import { Test, TestingModule } from '@nestjs/testing';
import { StudentquestionsController } from './studentquestions.controller';
import { StudentquestionsService } from './studentquestions.service';

describe('StudentquestionsController', () => {
  let controller: StudentquestionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentquestionsController],
      providers: [StudentquestionsService],
    }).compile();

    controller = module.get<StudentquestionsController>(StudentquestionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
