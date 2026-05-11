import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseAttendDto } from './create-course_attend.dto';

export class UpdateCourseAttendDto extends PartialType(CreateCourseAttendDto) {}
