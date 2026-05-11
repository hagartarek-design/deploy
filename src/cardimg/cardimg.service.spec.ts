import { Test, TestingModule } from '@nestjs/testing';
import { CardimgService } from './cardimg.service';

describe('CardimgService', () => {
  let service: CardimgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardimgService],
    }).compile();

    service = module.get<CardimgService>(CardimgService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
