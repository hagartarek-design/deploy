import { Module } from '@nestjs/common';
import { CourseAttendService } from './course_attend.service';
import { CourseAttendController } from './course_attend.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseAttend } from './entities/course_attend.entity';
import { Course } from 'src/courses/entities/course.entity';

@Module({
imports:[TypeOrmModule.forFeature([CourseAttend,Course])],
  controllers: [CourseAttendController],
  providers: [CourseAttendService],
})
export class CourseAttendModule {}
