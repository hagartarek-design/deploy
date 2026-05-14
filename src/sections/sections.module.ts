
import { Module } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { SectionsController } from './sections.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Section } from './entities/section.entity';
import { Lesson } from 'src/teacher/lesson/entities/lesson.entity';
import { Student } from 'src/students/entities/student.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[TypeOrmModule.forFeature([
    Section,Lesson,Student,Cart
  ])],
  controllers: [SectionsController],
  providers: [SectionsService,JwtService],
})
export class SectionsModule {}
