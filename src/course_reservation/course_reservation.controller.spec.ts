import { Test, TestingModule } from '@nestjs/testing';
import { CourseReservationController } from './course_reservation.controller';
import { CourseReservationService } from './course_reservation.service';

describe('CourseReservationController', () => {
  let controller: CourseReservationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseReservationController],
      providers: [CourseReservationService],
    }).compile();

    controller = module.get<CourseReservationController>(CourseReservationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
