import { Test, TestingModule } from '@nestjs/testing';
import { CourseAttendService } from './course_attend.service';

describe('CourseAttendService', () => {
  let service: CourseAttendService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseAttendService],
    }).compile();

    service = module.get<CourseAttendService>(CourseAttendService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
