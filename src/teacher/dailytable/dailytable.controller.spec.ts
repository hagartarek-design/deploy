import { Test, TestingModule } from '@nestjs/testing';
import { DailytableController } from './dailytable.controller';
import { DailytableService } from './dailytable.service';

describe('DailytableController', () => {
  let controller: DailytableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DailytableController],
      providers: [DailytableService],
    }).compile();

    controller = module.get<DailytableController>(DailytableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
