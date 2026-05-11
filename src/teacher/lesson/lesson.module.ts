import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Userquestion } from 'src/teacher/userquestion/entities/userquestion.entity';
import { Section } from 'src/sections/entities/section.entity';
import { Content } from 'src/content/entities/content.entity';
import { CourseInfo } from 'src/course_info/entities/course_info.entity';
import { Pdf } from 'src/pdf/entities/pdf.entity';
import { Cart } from 'src/cart/entities/cart.entity';
// import { PdfImage } from 'src/pdf-image/entities/pdf-image.entity';

@Module({
  imports:[TypeOrmModule.forFeature([//PdfImage,
  Cart,  Lesson,Content,Userquestion,Section,CourseInfo,Pdf])],
  controllers: [LessonController],
  providers: [LessonService],
})
export class LessonModule {}
