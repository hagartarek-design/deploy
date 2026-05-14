import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, UseGuards } from '@nestjs/common';
import { StudentCourseService } from './student_course.service';
import { CreateStudentCourseDto } from './dto/create-student_course.dto';
import { UpdateStudentCourseDto } from './dto/update-student_course.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/common/Gaurds/auth.guard';
@UseGuards(AuthGuard)
@Controller('student-course')
export class StudentCourseController {
  constructor(private readonly studentCourseService: StudentCourseService) {}

  @Post()
  create(@Body() createStudentCourseDto: CreateStudentCourseDto) {
    return this.studentCourseService.create(createStudentCourseDto);
  }

  @Get()
  studentcourse(@Req() req:Request) {
    // console.log(req['student']);
    
    return this.studentCourseService.studentcourse(req['user'].id);
  }
  @Get('courses')
  studentcourse2(@Req() req:Request,@Query('name') name:string) {
    // console.log(req['student']);
    
    return this.studentCourseService.studentcourse2(req['user'].id,name);
  }
  @Get('course')
  coursebystudent(@Req() req:Request,) {
    // console.log(req['student']);
    
    return this.studentCourseService.coursebystudent(req['user'].id,);
  }

  @Get('courseInfo/')
async  courseinfo(@Req() req:Request,@Query('course_id') course_id?:number) {
    // console.log(req['student']);
    
    return  await this.studentCourseService.courseinfo(req['user'].id,course_id);
  }
@Get('courseInfoid')
async courseinfobyid (@Req() req:Request,@Query('courseId') courseId:number){
return await this.studentCourseService.courseinfobyid(req['user'].id,courseId)

} 





@Get('/isEnrolled/:courseId')
async isEnrolled (@Req() req:Request,@Param('courseId') courseId:number){
const result= await this.studentCourseService.isEnrolled(req['user'].id,courseId)
return {enrolled:result}
} 
@Get('sections/:infoid')
async courseinfobyid2 (@Req() req:Request,@Param('infoid') infoid:number){
return await this.studentCourseService.courseinfobyid2(req['user'].id,infoid)

} 

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentCourseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentCourseDto: UpdateStudentCourseDto) {
    return this.studentCourseService.update(+id, updateStudentCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentCourseService.remove(+id);
  }
}
