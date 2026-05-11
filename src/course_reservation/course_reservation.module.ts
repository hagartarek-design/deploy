import { Module } from '@nestjs/common';
import { CourseReservationService } from './course_reservation.service';
import { CourseReservationController } from './course_reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseReservation } from './entities/course_reservation.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CourseReservation])],
  controllers: [CourseReservationController],
  providers: [CourseReservationService],
})
export class CourseReservationModule {}
