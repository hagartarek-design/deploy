import { Module } from '@nestjs/common';
import { AttachmentsService } from './attachments.service';
import { AttachmentsController } from './attachments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attachment } from './entities/attachment.entity';
import { Exam } from 'src/teacher/exams/entities/exam.entity';
import { Assignment } from 'src/assignments/entities/assignment.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { Student } from 'src/students/entities/student.entity';
import { Lesson } from 'src/teacher/lesson/entities/lesson.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[TypeOrmModule.forFeature([Attachment,Exam,Assignment,Course,Cart,Student,Lesson])],
  controllers: [AttachmentsController],
  providers: [AttachmentsService,JwtService],
})
export class AttachmentsModule {}
