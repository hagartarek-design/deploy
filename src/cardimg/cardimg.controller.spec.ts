import { Test, TestingModule } from '@nestjs/testing';
import { CardimgController } from './cardimg.controller';
import { CardimgService } from './cardimg.service';

describe('CardimgController', () => {
  let controller: CardimgController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardimgController],
      providers: [CardimgService],
    }).compile();

    controller = module.get<CardimgController>(CardimgController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
