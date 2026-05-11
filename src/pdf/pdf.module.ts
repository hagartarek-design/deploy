import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { PdfController } from './pdf.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from 'src/teacher/lesson/entities/lesson.entity';
// import Content from 'twilio/lib/rest/Content';
import { Userquestion } from 'src/teacher/userquestion/entities/userquestion.entity';
import { Section } from 'src/sections/entities/section.entity';
import { Pdf } from './entities/pdf.entity';
import { Content } from 'src/content/entities/content.entity';

@Module({imports:[TypeOrmModule.forFeature([//PdfImage,
    Lesson,Content,Userquestion,Section,Pdf])],
  controllers: [PdfController],
  providers: [PdfService],
})
export class PdfModule {}
