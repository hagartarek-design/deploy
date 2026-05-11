import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, UseInterceptors, UploadedFile, BadRequestException, Request } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { createExamDto, CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'common/Gaurds/auth.guard';

@Controller('exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Post()
  create(@Body() createExamDto: CreateExamDto) {
    return this.examsService.create(createExamDto);
  }
  
  @Get('online/offline')
async  exam_offline_online(@Query('online') online?:boolean,@Query('page') page?:number
,@Query('limit') limit?:number,){
return  await this.examsService.exam_offline_online(online,page,limit)
}
@Post('/upload')
@UseGuards(AuthGuard)
@UseInterceptors(FileInterceptor('file'))
async uploadcard(@Request() req, @UploadedFile() file: Express.Multer.File,@Body() createExamDto:createExamDto) {
  console.log('User:', req.user);
  console.log('Uploaded File:', file);

  if (!file) {
    throw new BadRequestException('No file uploaded');
  }

  const response = await this.examsService.uploadFile(req.user.id, file,createExamDto);
  return response;
}
@Get()
withpaginating(@Query('page') page?:number
,@Query('limit') limit?:number,){
return this.examsService.getpagination(page,limit)

}
@Get('online')
withpaginatingonline(@Query('page') page?:number
,@Query('limit') limit?:number,){
return this.examsService.getpaginationonline(page,limit)

}

@Get('filter/:id')
async search(@Query('search') search: string) {
  console.log(this.examsService.searchExams(search || ''));
  
  return this.examsService.searchExams(search || '');
}
 
 

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.examsService.remove(+id);}
  }

