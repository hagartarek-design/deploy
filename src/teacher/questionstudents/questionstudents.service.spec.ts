import { Test, TestingModule } from '@nestjs/testing';
import { QuestionstudentsService } from './questionstudents.service';

describe('QuestionstudentsService', () => {
  let service: QuestionstudentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionstudentsService],
    }).compile();

    service = module.get<QuestionstudentsService>(QuestionstudentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
