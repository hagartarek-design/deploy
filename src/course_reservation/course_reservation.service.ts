import { Injectable } from '@nestjs/common';
import { CreateCourseReservationDto } from './dto/create-course_reservation.dto';
import { UpdateCourseReservationDto } from './dto/update-course_reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseReservation } from './entities/course_reservation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CourseReservationService {
  constructor(@InjectRepository(CourseReservation) private readonly coursereservation:Repository<CourseReservation> ){

  }
  create(createCourseReservationDto: CreateCourseReservationDto) {
    return 'This action adds a new courseReservation';
  }

 async getcoursereservation(){
   return  await this.coursereservation.find({relations:['students','course']})
  }
  findAll() {
    return `This action returns all courseReservation`;
  }
  
  findOne(id: number) {
    return `This action returns a #${id} courseReservation`;
  }

  update(id: number, updateCourseReservationDto: UpdateCourseReservationDto) {
    return `This action updates a #${id} courseReservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} courseReservation`;
  }
}
