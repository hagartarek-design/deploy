import { Module } from '@nestjs/common';
import { QuestionstudentsService } from './questionstudents.service';
import { QuestionstudentsController } from './questionstudents.controller';

@Module({
  controllers: [QuestionstudentsController],
  providers: [QuestionstudentsService],
})
export class QuestionstudentsModule {}
