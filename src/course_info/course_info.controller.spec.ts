import { Test, TestingModule } from '@nestjs/testing';
import { CourseInfoController } from './course_info.controller';
import { CourseInfoService } from './course_info.service';

describe('CourseInfoController', () => {
  let controller: CourseInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseInfoController],
      providers: [CourseInfoService],
    }).compile();

    controller = module.get<CourseInfoController>(CourseInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
