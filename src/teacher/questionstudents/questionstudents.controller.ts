import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionstudentsService } from './questionstudents.service';
import { CreateQuestionstudentDto } from './dto/create-questionstudent.dto';
import { UpdateQuestionstudentDto } from './dto/update-questionstudent.dto';

@Controller('questionstudents')
export class QuestionstudentsController {
  constructor(private readonly questionstudentsService: QuestionstudentsService) {}

  @Post()
  create(@Body() createQuestionstudentDto: CreateQuestionstudentDto) {
    return this.questionstudentsService.create(createQuestionstudentDto);
  }

  @Get()
  findAll() {
    return this.questionstudentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionstudentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionstudentDto: UpdateQuestionstudentDto) {
    return this.questionstudentsService.update(+id, updateQuestionstudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionstudentsService.remove(+id);
  }
}
