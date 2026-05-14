import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, NotFoundException } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Userquestion } from '../userquestion/entities/userquestion.entity';
import { In, Repository } from 'typeorm';
import { Content } from 'src/content/entities/content.entity';
import { Lesson, TrackProgressDto } from './entities/lesson.entity';
import { Section } from 'src/sections/entities/section.entity';
import { Public } from 'src/common/decorator/public.decorator';
// import { Public } from 'common/decorator/public.decorator';


@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService
,@InjectRepository(Userquestion) private readonly userquestion:Repository<Userquestion>
,@InjectRepository(Content) private readonly contentRepo:Repository<Content>
,@InjectRepository(Lesson) private readonly lessonRepo:Repository<Lesson>
,@InjectRepository(Lesson) private readonly lessons:Repository<Lesson>
,@InjectRepository(Section) private readonly sectionRepo:Repository<Section>

  ) {}

  @Post()
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonService.create(createLessonDto);
  }

  @Get()
  findAll() {
    console.log( this.lessonService.findAll());
    
    return this.lessonService.findAll();
  }

  @Get('typelesson')
  lessontype(@Query('title') title:string,@Req() req:Request,@Query('sectionId') sectionId:number) {
    // console.log( this.lessonService.lessontype(title));
    
    return this.lessonService.lessontype(title,req['student'].id,sectionId);
  } 
@Get('lessonquestions/:id') 
async  getLessonQuestions(@Param('id') id:number,@Query('page') page?:number
,@Query('limit') limit?:number,
)
{
  console.log('page',page);
  console.log('limit',limit);
  return await this.lessonService.getLessonQuestions(id,page,limit)
}
  @Delete('/:id')
  async deletelesson(@Param("id") id:number) {
    return await this.lessonService.deletelesson(id);
  }
  @Post('/addLesson')
 async addlesson(){

    return await this.lessonService.addlesson()
  }

  @Post('/addLessonstocart/:sectionId')
 async addalllessonstocart(@Param('sectionId') sectionId:number){

    return await this.lessonService.addalllessonstocart(sectionId)
  }
 @Get('solved-percent/:sectionId')
  async getSolvedPercent(@Param('sectionId') sectionId: number) {
    return await this.lessonService.getSolvedQuestionsPercentBySection(sectionId);
  }

  @Public()
  @Get('lessonspercent/:lessonId')
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



  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonService.update(+id, updateLessonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonService.remove(+id);
  }

async getLessonViewPercent(lessonId: number) {
  const lesson = await this.lessons.findOne({
    where: { id: lessonId },
    relations: ['content'],
  });

  if (!lesson) return { lessonId, percent: 0 };

  // Ensure this lesson is under "المحاضرات"
  const hasLectureContent =
    lesson.content?.some(c => c.title === 'المحاضرات');

  if (!hasLectureContent) return { lessonId, percent: 0 };

  const percent = lesson.viewedCount > 0 ? 50 : 0;

  // Save
  lesson.viewPercent = percent;
  await this.lessons.save(lesson);

  return { lessonId, percent };
}

@Public()
@Post('lesson/:lessonId/watched')
async markVideoWatched(@Param('lessonId') lessonId: number,) {
  // Find lesson
  const lesson = await this.
     lessonRepo.findOne({
     where: { id: lessonId }, 
     relations: ['section', 'content'] });
  if (!lesson) throw new NotFoundException('Lesson not found');

  if (!lesson.content?.some(c => c.title === 'المحاضرات')) 
    return { message: 'Not a lecture video' };

  if (!lesson.viewedCount) lesson.viewedCount = 0;
  if(lesson.viewedCount==0||lesson.viewedCount==null)
  lesson.viewedCount += 1;

  await this.lessonRepo.save(lesson);

  await this.getLessonViewPercent(lessonId);

 const g= await this.getLessonViewPercent(lessonId);
  return { 
    g,
    message: 'Video marked as watched automatically' };
}


}
