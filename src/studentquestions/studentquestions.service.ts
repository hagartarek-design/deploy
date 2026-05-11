import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentquestionDto } from './dto/create-studentquestion.dto';
import { UpdateStudentquestionDto } from './dto/update-studentquestion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Studentquestion } from './entities/studentquestion.entity';
import { Course } from 'src/courses/entities/course.entity';

@Injectable()
export class StudentquestionsService {
  
  constructor(
    @InjectRepository(Studentquestion) private readonly  repository:Repository<Studentquestion>

,@InjectRepository(Course) private readonly courseRepo:Repository<Course>
  ){}
 async create(createStudentquestionDto: CreateStudentquestionDto,id:number,name:string) {
const students=await this.repository.findOne({
  relations:['course'],
  where:{ course:{name:name, student_id:{id}}}})
  const course=await this.courseRepo.findOne({where:{name,student_id:{id}}})
  // console.log(course.id);
if(!course)return new NotFoundException("student not found")
  console.log(students.course.id);
  
  const  quesAnswer= await this.repository.create({
    ...createStudentquestionDto,course:{id:course.id},student:{id:students.id}});
 return await this.repository.save(quesAnswer);

}
  findAll() {
    return `This action returns all studentquestions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} studentquestion`;
  }

  update(id: number, updateStudentquestionDto: UpdateStudentquestionDto) {
    return `This action updates a #${id} studentquestion`;
  }

  remove(id: number) {
    return `This action removes a #${id} studentquestion`;
  }
}
