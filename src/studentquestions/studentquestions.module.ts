import { Module } from '@nestjs/common';
import { StudentquestionsService } from './studentquestions.service';
import { StudentquestionsController } from './studentquestions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/courses/entities/course.entity';
import { Studentquestion } from './entities/studentquestion.entity';
import { Student } from 'src/students/entities/student.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Course,Studentquestion,Student])],
  controllers: [StudentquestionsController],
  providers: [StudentquestionsService],
})
export class StudentquestionsModule {}
