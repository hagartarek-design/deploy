import { Test, TestingModule } from '@nestjs/testing';
import { UserquestionService } from './userquestion.service';

describe('UserquestionService', () => {
  let service: UserquestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserquestionService],
    }).compile();

    service = module.get<UserquestionService>(UserquestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
