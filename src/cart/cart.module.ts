import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attachment } from 'src/attachments/entities/attachment.entity';
import { Cart } from './entities/cart.entity';
import { Student } from 'src/students/entities/student.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Section } from 'src/sections/entities/section.entity';
import { Lesson } from 'src/teacher/lesson/entities/lesson.entity';
import { JwtService } from '@nestjs/jwt';
// import {Lesson} from 'src/lessons/entities/lessons.entity';
@Module({
  imports:[TypeOrmModule.forFeature([
    Lesson,
    Attachment,Cart,Student,Course,Section,Student])],
  controllers: [CartController],
  providers: [CartService,JwtService],
})
export class CartModule {}
