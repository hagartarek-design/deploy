import { Test, TestingModule } from '@nestjs/testing';
import { AcademicYearController } from './academic_year.controller';
import { AcademicYearService } from './academic_year.service';

describe('AcademicYearController', () => {
  let controller: AcademicYearController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AcademicYearController],
      providers: [AcademicYearService],
    }).compile();

    controller = module.get<AcademicYearController>(AcademicYearController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
