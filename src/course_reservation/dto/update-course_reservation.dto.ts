import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseReservationDto } from './create-course_reservation.dto';

export class UpdateCourseReservationDto extends PartialType(CreateCourseReservationDto) {}
