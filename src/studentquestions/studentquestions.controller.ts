import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { StudentquestionsService } from './studentquestions.service';
import { CreateStudentquestionDto } from './dto/create-studentquestion.dto';
import { UpdateStudentquestionDto } from './dto/update-studentquestion.dto';
import { Request } from 'express';

@Controller('studentquestions')
export class StudentquestionsController {
  constructor(private readonly studentquestionsService: StudentquestionsService) {}

  @Post('')
  create(@Body() createStudentquestionDto: CreateStudentquestionDto,@Req() req:Request

,@Query('name') name:string
) {
    return this.studentquestionsService.create(createStudentquestionDto,req['student'].id,name);
  }

  @Get()
  findAll() {
    return this.studentquestionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentquestionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentquestionDto: UpdateStudentquestionDto) {
    return this.studentquestionsService.update(+id, updateStudentquestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentquestionsService.remove(+id);
  }
}
