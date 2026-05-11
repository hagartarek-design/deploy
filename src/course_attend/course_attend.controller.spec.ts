import { Test, TestingModule } from '@nestjs/testing';
import { CourseAttendController } from './course_attend.controller';
import { CourseAttendService } from './course_attend.service';

describe('CourseAttendController', () => {
  let controller: CourseAttendController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseAttendController],
      providers: [CourseAttendService],
    }).compile();

    controller = module.get<CourseAttendController>(CourseAttendController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
