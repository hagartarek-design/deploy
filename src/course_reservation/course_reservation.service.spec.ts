import { Test, TestingModule } from '@nestjs/testing';
import { CourseReservationService } from './course_reservation.service';

describe('CourseReservationService', () => {
  let service: CourseReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseReservationService],
    }).compile();

    service = module.get<CourseReservationService>(CourseReservationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
