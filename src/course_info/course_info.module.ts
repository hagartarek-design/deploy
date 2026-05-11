import { Module } from '@nestjs/common';
import { CourseInfoService } from './course_info.service';
import { CourseInfoController } from './course_info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseInfo } from './entities/course_info.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Lesson } from 'src/teacher/lesson/entities/lesson.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CourseInfo,Course,Lesson])],
  controllers: [CourseInfoController],
  providers: [CourseInfoService],
})
export class CourseInfoModule {}
