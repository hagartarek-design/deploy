import { Test, TestingModule } from '@nestjs/testing';
import { DailytableService } from './dailytable.service';

describe('DailytableService', () => {
  let service: DailytableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DailytableService],
    }).compile();

    service = module.get<DailytableService>(DailytableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
