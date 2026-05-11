import { Test, TestingModule } from '@nestjs/testing';
import { StudentquestionsService } from './studentquestions.service';

describe('StudentquestionsService', () => {
  let service: StudentquestionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentquestionsService],
    }).compile();

    service = module.get<StudentquestionsService>(StudentquestionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
