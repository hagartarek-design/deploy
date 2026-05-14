import { BadRequestException, Body, Controller, Get,  Param, Patch, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { StudentsService } from './students.service';
import { addAnswerDto, CreateStudentDto, createstudDto, sendOtpDTO, UpdateStudentDtoinfo } from './dto/create-student.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/entities/public';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Request } from 'express';
import { AuthGuard } from 'common/Gaurds/auth.guard';
import { AuthRequest } from 'common/interfaces/auth-request.interface';
// import { AuthRequest } from 'src/common/interfaces/auth-request.interface';
@UseGuards(AuthGuard)
@Controller('students')

export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}
@Public()
  @Post('sendSmsOtp')
 async  sendSmsOtp(@Body() sendOtpDTO:sendOtpDTO){
return await this.studentsService.sendSmsOtp(sendOtpDTO)
  }
@Get('coursetype/:coursetype')
async typeonline(@Param('coursetype') coursetype:string){
return await this.studentsService.typeonline(coursetype)

}

@Get()
async searchStu(@Query('search') search: string) {
  // console.log(this.studentsService.searchStudents(search || ''));
  
  return this.studentsService.searchStudents(search || '');
}

@Get('bycourse')
async searchCourseId(@Query('search') search: string,@Query('id') id:number) {
  // console.log(this.studentsService.searchCourseId(search || ''));
  
  return await this.studentsService.searchCourseId(search || '',id);
}
//  async searchStudents(search: string): Promise<Exam[]> {
  
//   // let lesson=this.lessonsRepository.
//   return this.repository.find({
//       where: [
//         { exam_name: Like(`%${search}%`) },
//         {lessons :{name: Like(`%${search}%`)} },
//       ],
//     });
//   }

@Get('profile')
async profile(@Req() req: AuthRequest) {

  console.log(req.user);

  return await this.studentsService.profile(req.user.id);
}
  @Get('filter/:id')
async search(@Query('search') search: string) {
  // console.log(this.examsService.searchStudents(search || ''));
  
  return this.studentsService.search(search || '');
}
  @Get('mycourses/user')
async mycourses(@Req() req:Request) {
  // console.log(this.examsService.mycoursesStudents(mycourses || ''));
  
  return await this.studentsService.mycourses(req['student'].id);
}

@Get('/pagination')
withpaginating(@Query() paginationDto:CreateStudentDto){
  const { page, limit } = paginationDto;


  const offset = (page - 1) * limit;
return this.studentsService.getpagination(offset,limit)

}
@Get('/paginationcour')
getpaginationid(@Query() paginationDto:CreateStudentDto,@Query('id') id:number,){
  const { page, limit } = paginationDto;


  const offset = (page - 1) * limit;
return this.studentsService.getpaginationid(offset,limit,id)

}
@Patch('/:id')
async addAnswer(@Param('id') id:number,@Body() addAnswerDto:addAnswerDto){
return await this.studentsService.addAnswer(id,addAnswerDto)
}

@Patch('/schedualCenter/p')
async upload(@Body() UpdateStudentDto:UpdateStudentDtoinfo,@Req() req:Request){
return await this.studentsService.update(UpdateStudentDto,req['student'].id)
}
//   @Patch('/upload/pic')
//   @UseInterceptors(FileInterceptor('file'))
//   async uploadFile(@Req() req:Request, //id:number,
//    @UploadedFile() file: Express.Multer.File) {
//     console.log('Uploaded File:', file);

//     if (!file) {
//       throw new BadRequestException('No file uploaded');
//     }

//     const response = await this.studentsService.handleFileUpload(req['student'].id, file);
//     return response;
//   }

//    @Post('/upload')
// @UseGuards(AuthGuard)
// @UseInterceptors(FileInterceptor('file'))
// async uploadcard(@Request() req, @UploadedFile() file: Express.Multer.File,@Body() createSectionDto:CreateSectionDto) {
//   console.log('User:', req.user);
//   console.log('Uploaded File:', file);

//   if (!file) {
//     throw new BadRequestException('No file uploaded');
//   }

//   const response = await this.usersService.uploadFile(req.user.id, file,createSectionDto);
//   return response;
// }
 
  @Patch('/upload/pi')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Req() req:Request, @UploadedFile() file: Express.Multer.File) {
    // console.log('User:', req.st);
    // console.log('Uploaded File:', file);

    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const response = await this.studentsService.handleFileUpload(req['student'].id, file);
    return response;
  }

@Get('findoneuser/:id')

async findbyId(@Param('id') id:number,@Req() req
,@Query('page') page?:number
,@Query('limit') limit?:number,//@Query('attendance') attendance?:boolean
@Query('attendence') attendence?:boolean,//@Query('attendance') attendance?:boolean
@Query('exam_name') exam_name?:string,

)
{
  // console.log('page',page);
  // console.log('limit',limit);
  
  return await this .studentsService.findbyId(id,req.user.id,page,limit,
 attendence, exam_name,  
  )  
}

@Get('/:attendence')
async getattendence(
  @Param('attendence') attendence:boolean,
  @Param('id') id:number
){
  return await this.studentsService.getattendence(attendence,id)
}
  @Get()
 async findAll() {
    return await this.studentsService.findAll();
  }
@Post('/stuInfo')
async saveinfo(createstudDto:createstudDto){
  return await this.studentsService.saveinfo(createstudDto)
}

}
