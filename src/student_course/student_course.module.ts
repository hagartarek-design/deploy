import { Module } from '@nestjs/common';
import { StudentCourseService } from './student_course.service';
import { StudentCourseController } from './student_course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentCourse } from './entities/student_course.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Student } from 'src/students/entities/student.entity';
import { CourseInfo } from 'src/course_info/entities/course_info.entity';

@Module({
  imports:[TypeOrmModule.forFeature([StudentCourse,Course,Student,CourseInfo])],
  controllers: [StudentCourseController],
  providers: [StudentCourseService],
})
export class StudentCourseModule {}
