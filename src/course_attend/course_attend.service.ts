import { Injectable } from '@nestjs/common';
import { CreateCourseAttendDto } from './dto/create-course_attend.dto';
import { UpdateCourseAttendDto } from './dto/update-course_attend.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseAttend } from './entities/course_attend.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CourseAttendService {
  constructor(@InjectRepository( CourseAttend)
   private readonly Repository:Repository<CourseAttend>){}
  create(createCourseAttendDto: CreateCourseAttendDto) {
    return 'This action adds a new courseAttend';
  }

  findAll() {
    return `This action returns all courseAttend`;
  }

  


 
    
async withpaginating(offset:number,limit:number){
return  await this.Repository.find({skip:offset,take:limit})
}


async withoutpaginating(){
return  await this.Repository.find()
}
  findOne(id: number) {
    return `This action returns a #${id} courseAttend`;
  }

  update(id: number, updateCourseAttendDto: UpdateCourseAttendDto) {
    return `This action updates a #${id} courseAttend`;
  }

  // remove(id: number) {
  //   return `This action removes a #${id} courseAttend`;
  // }
}
