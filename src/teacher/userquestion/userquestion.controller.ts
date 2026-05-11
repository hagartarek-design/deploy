import { Controller, Get, Body, Patch, Param, Delete, Query, Post, Req, ParseIntPipe } from '@nestjs/common';
import { UserquestionService } from './userquestion.service';
import { createanswerDto, } from './dto/create-userquestion.dto';
import { Request } from 'express';
import { Public } from 'common/decorator/public.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from '../lesson/entities/lesson.entity';
// import {public } from './'

import { Repository } from 'typeorm';
import { Userquestion } from './entities/userquestion.entity';

@Controller('userquestion')
export class UserquestionController {
  constructor(private readonly userquestionService: UserquestionService,
@InjectRepository(Lesson) private readonly lessons:Repository<Lesson>
,@InjectRepository(Userquestion) private readonly questionrepo:Repository<Userquestion>

  ) {}

@Post('/:id')
async addAnswer(@Body() createanswerDto:createanswerDto,@Param('id') id ){
 return await this.userquestionService.addAnswer(createanswerDto,id)
}
@Patch()
async answerOfQuestion(
  @Query('id') id: number,
  @Body('student_answer') student_answer: string,
  // @Req() req: Request
) {
  // console.log(req['student'].id);
  console.log(id);
  console.log(student_answer);
  console.log(await this.userquestionService.answerOfQuestion(
    id,
    student_answer,
    // req['student'].id
  ));
  
  return await this.userquestionService.answerOfQuestion(
    id,
    student_answer,
    // req['student'].id
  );
  
}
async getSolvedQuestionsPercentByLesson(@Param('lessonId') lessonId: number) {
  const lesson = await this.lessons.findOne({
    where: { id: lessonId },
    relations: ['content', 'questions'],
  });

  if (!lesson) return { percent: 0 };

  // Only apply if content title matches
  const hasRequiredContent = lesson.content?.some(c => c.title === 'واجبات و امتحنات');
  if (!hasRequiredContent) return { percent: 0 };

  const questions = lesson.questions || [];

  if (!questions.length) {
    lesson.percentageAnswer = 0;
    await this.lessons.save(lesson);
    return { lessonId, percent: 0 };
  }

  // FIXED: handle boolean / number / string
  const solvedCount = questions.filter(q => Number(q.solved) === 1).length;

  const percent = Math.round((solvedCount / questions.length) * 100);

  lesson.percentageAnswer = percent;

  await this.lessons.save(lesson);

  return { lessonId, percent };
}
@Patch('exams/e')
async answerOfQuestionexam(
  @Query('id') id: number,
  @Body('studentAnswerExam') studentAnswerExam: string,
  // @Req() req: Request
) {
  let g=await this.questionrepo.findOne({where:{id:id}})
  // console.log(req['student'].id);
  console.log(id);
  console.log(studentAnswerExam);
  console.log(await this.userquestionService.answerOfQuestionexam(
    id,
    studentAnswerExam,
    // req['student'].id
  ));
  
  return await this.userquestionService.answerOfQuestionexam(
    id,
    studentAnswerExam,
    // req['student'].id
  );
  
}
@Public ()
 @Get('my/allpercents')
  resultExamAssign(@Query('lessonId') lessonId?:number){
    return this.userquestionService.resultExamAssign(lessonId)
  }
  @Get()
  findAll(@Query('page') page?:number
  ,@Query('limit') limit?:number


) {
    return this.userquestionService.findAll(page,limit);
  }
  // @Public()
@Get('questions')
questions(@Query('lessonId',ParseIntPipe) lessonId:number,
  @Query('page') page?: number,
  @Query('limit') limit?: number,
) {
  return this.userquestionService.questions(lessonId,page, limit,

  );
}
@Get('lesson')
lessonques(@Query('lessonId',ParseIntPipe) lessonId:number,
  @Query('page') page?: number,
  @Query('limit') limit?: number,
) {
  return this.userquestionService.lessonques(lessonId,page, limit,

  );
}
@Get('questions/questionsexams')
questionsexams(@Query('examId',ParseIntPipe) examId:number,
  @Query('page') page?: number,
  @Query('limit') limit?: number,
) {
  return this.userquestionService.questionsexams(examId,page, limit,

  );
}


  // @Get(':examId')
  // findOne(@Param('id') id: string) {
  //   return this.userquestionService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserquestionDto: UpdateUserquestionDto) {
  //   return this.userquestionService.update(+id, updateUserquestionDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userquestionService.remove(+id);
  // }
}
