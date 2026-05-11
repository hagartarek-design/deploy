import { Module } from '@nestjs/common';
import { UserquestionService } from './userquestion.service';
import { UserquestionController } from './userquestion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Userquestion } from './entities/userquestion.entity';
import { Lesson } from 'src/teacher/lesson/entities/lesson.entity';
import { Student } from 'src/students/entities/student.entity';

@Module({imports:[TypeOrmModule.forFeature([
  Userquestion,Lesson,Student
])],
  controllers: [UserquestionController],
  providers: [UserquestionService,],
})
export class UserquestionModule {}
