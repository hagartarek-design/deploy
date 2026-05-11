import { ConflictException, Injectable } from '@nestjs/common';
import { CreateStudentCourseDto } from './dto/create-student_course.dto';
import { UpdateStudentCourseDto } from './dto/update-student_course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/students/entities/student.entity';
import { Repository } from 'typeorm';
import { Course } from './../courses/entities/course.entity';
import { StudentCourse } from './entities/student_course.entity';
import { CourseInfo } from 'src/course_info/entities/course_info.entity';

@Injectable()
export class StudentCourseService {
  constructor(
    @InjectRepository(StudentCourse

  ) 
  private readonly Coursesturepo:Repository<StudentCourse
  >
  ,  @InjectRepository(Student

  ) 
  private readonly students:Repository<Student
  >
  ,  @InjectRepository(CourseInfo
  ) 
  private readonly courseInfo:Repository<CourseInfo  >
  ,  @InjectRepository(Course

  ) 
  private readonly Courses:Repository<Course
  >
){

  }
// async coursebystudent(student_id:number){
// const Course=await this.Coursesturepo.find({where:{student_id},relations:['course','student']})
// return Course;
// }

// async 
async coursebystudent(id:number){
const course=await this.Courses.find({where:{student_id:{id}},relations:['course_info','student_id']})
return {course};
}
async courseinfo(id:number,course_id?:number
  
){
const course=await this.Courses.find({where:{
  students:{id},id:course_id,},
  relations:['course_info','section']})
// console.log(course_id);

return {course};
}

async isEnrolled(studentId: number, courseId: number) {
  const exists = await this.Coursesturepo.exists({
    where: { student_id: studentId, course_id: courseId ,course:{isUsed:false}},
  });

  // const isUsed = await this.Coursesturepo.f({
  //   where: { course: { isUsed: true }, },
  // });

  return  exists ;
}

async courseinfobyid (id:number,courseId:number){
  
const course=await this.courseInfo.find({where:{students:{id},id:courseId,},relations:['section.lesson']})
return {course};
}
async courseinfobyid2 (id:number,infoid:number){
const courseinfo=await this.courseInfo.find({where:{students:{id},id:infoid,},relations:['section']})
return courseinfo;
}
async findbyname(id:number,course_num:string){
const course_nums=await this.Courses.find({where:{student:{id},}})
}
  async studentcourse(id:number){

    const course=await this.students.find({where:{id:id},relations:[  'student_course.course.course_info',
  'student_course.course.exam','student_course.course.section'
  // 'student_course.course.assignment',
],select:{student_course:true ,},})
    console.log(course);
const examlength=course.map((e)=>e.student_course.map((e)=>e.course.exam)).length
const assignmentlength=course.map((e)=>e.student_course.map((e)=>e.course.exam)).length
    // console.log(course?.map((e)=>e.course?.map((e)=>e.description)));
    // return course.map((e) => e.course?.description);
console.log();
const sumExamAss=examlength+assignmentlength;
    
//     const courseid=await this.Coursesturepo.findOne({where:{studentId:id}});
//     console.log(courseid);
//     console.log(courseid.studentId);
//  if(courseid.studentId!=id)
  // return new ConflictException('invalid student')
return {course,sumExamAss};
  }




  async studentcourse2(id:number,name:string ){

    const course=await this.Courses.find({where:{student:{id},name},relations:[  'course_info',
 
  // 'student_course.course.assignment',
],})

    console.log(course);
// const examlength=course.map((e)=>e.student_course.map((e)=>e.course.exam)).length
// const assignmentlength=course.map((e)=>e.student_course.map((e)=>e.course.exam)).length
    // console.log(course?.map((e)=>e.course?.map((e)=>e.description)));
    // return course.map((e) => e.course?.description);
console.log();
// const sumExamAss=examlength+assignmentlength;
    
//     const courseid=await this.Coursesturepo.findOne({where:{studentId:id}});
//     console.log(courseid);
//     console.log(courseid.studentId);
//  if(courseid.studentId!=id)
  // return new ConflictException('invalid student')
return {course,};
  }

  create(createStudentCourseDto: CreateStudentCourseDto) {
    return 'This action adds a new studentCourse';
  }

  findAll() {
    return `This action returns all studentCourse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} studentCourse`;
  }

  update(id: number, updateStudentCourseDto: UpdateStudentCourseDto) {
    return `This action updates a #${id} studentCourse`;
  }

  remove(id: number) {
    return `This action removes a #${id} studentCourse`;
  }
}
