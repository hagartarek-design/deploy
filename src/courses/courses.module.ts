import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Student } from 'src/students/entities/student.entity';
import { Event } from 'src/teacher/events/entities/event.entity';
import { CourseAttend } from 'src/course_attend/entities/course_attend.entity';
import { Exam } from 'src/teacher/exams/entities/exam.entity';
import { CourseInfo } from 'src/course_info/entities/course_info.entity';
import { Section } from 'src/sections/entities/section.entity';
import { Lesson } from 'src/teacher/lesson/entities/lesson.entity';
import { Studentquestion } from 'src/studentquestions/entities/studentquestion.entity';
import { Cart } from 'src/cart/entities/cart.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Cart,Course,Student,Event,CourseAttend,Exam,CourseInfo,Section,Lesson,Studentquestion])],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
