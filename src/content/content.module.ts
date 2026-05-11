import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from 'src/teacher/lesson/entities/lesson.entity';
import { Content } from './entities/content.entity';

@Module({imports:[TypeOrmModule.forFeature([Content,Lesson,])],
  controllers: [ContentController],
  providers: [ContentService],
})
export class ContentModule {}
