import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CourseReservationService } from './course_reservation.service';
import { CreateCourseReservationDto } from './dto/create-course_reservation.dto';
import { UpdateCourseReservationDto } from './dto/update-course_reservation.dto';

@Controller('course-reservation')
export class CourseReservationController {
  constructor(private readonly courseReservationService: CourseReservationService) {}
@Get()
getcoursereservation(){
  return this .courseReservationService.getcoursereservation()
}
  @Post()
  create(@Body() createCourseReservationDto: CreateCourseReservationDto) {
    return this.courseReservationService.create(createCourseReservationDto);
  }

  @Get()
  findAll() {
    return this.courseReservationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseReservationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseReservationDto: UpdateCourseReservationDto) {
    return this.courseReservationService.update(+id, updateCourseReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseReservationService.remove(+id);
  }
}
