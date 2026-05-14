import { Controller, Get, Post, Body, Patch, Param, Delete,ParseIntPipe, Query,UploadedFile, BadRequestException, Req, UseInterceptors, NotFoundException, Res, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto, RechargeDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import * as path from 'path';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { existsSync, createReadStream } from 'fs';
import { Request, Response } from 'express';
import { Public } from 'src/auth/entities/public';
import { LessonService } from './../teacher/lesson/lesson.service';
import { InjectRepository } from '@nestjs/typeorm';
// import { Lesson } from 'src/course_info/entities/course_info.entity';
import { Repository } from 'typeorm';
import { Lesson } from 'src/teacher/lesson/entities/lesson.entity';
import * as fs from 'fs';
import { AuthGuard } from 'src/common/Gaurds/auth.guard';
@UseGuards(AuthGuard)
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService
    ,@InjectRepository(Lesson)private readonly lesson:Repository< Lesson>
  ) {

  }

  // @Post()
  // create(@Body() createCourseDto: CreateCourseDto) {
  //   return this.coursesService.create(createCourseDto);
  // }
  @Get('sectionbyid')
async getbysectionid(@Req()req:Request,@Query('section_id') section_id:number ){
  // console.log('mmm',section_id);
  
return await this.coursesService.getbysectionid(req['user'].id,section_id)
}  

@Get('getallcourses')
async getallCourses(@Req() req:Request)
{
  return await this.coursesService.getallCourses(req['user'].id)
}
 @Patch('card')
  async createCard(@Req() req:Request) {
    return this.coursesService.generateCard(req['user'].id);
  }
  @Get('getsectionid')
async getsectionid(@Req()req:Request,@Query('lesson_id') lesson_id:number ){
  // console.log('mmm',lesson_id);
  
return await this.coursesService.getsectionid(req['user'].id,lesson_id)
}  
 @Post('upload/pdf')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
        cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))
  async uploadPDF(@UploadedFile() file: Express.Multer.File): Promise<Lesson> {
    return this.coursesService.createPDF(file);
  }

  @Get()
  async getAllPDFs(): Promise<Lesson[]> {
    return this.coursesService.getAllPDFs();
  }

  @Get(':id')
  async getPDF(@Param('id') id: number): Promise<Lesson> {
    return this.coursesService.getPDF(id);
  }

  @Post(':id/reorder')
  async reorderPages(
    @Param('id') id: number,
    @Body() body: { pageOrder: number[] },
  ): Promise<Lesson> {
    return this.coursesService.reorderPages(id, body.pageOrder);
  }

  @Delete(':id')
  async deletePDF(@Param('id') id: number): Promise<void> {
    return this.coursesService.deletePDF(id);
  }
@Get('/paginationrel')
withpaginating(@Query() paginationDto:CreateCourseDto){
  const { page, limit } = paginationDto;


  const offset = (page - 1) * limit;
  // console.log(page);
  // console.log(limit);
  
return this.coursesService.withpaginating(offset,limit)

}
// @Post()
// uploadVideo(){
//   return;
// }
@Get('/allrel')
allcourses( ){
  
return this.coursesService.allcourses()

}

@Get("bystudent/:id")
findby( 
  @Query("name") name:string ,
  @Query("phoneNum") phoneNum:string ,
  @Query("email") email:string ,
 @Param("id") id: number
){
return this.coursesService.findby(name,phoneNum,email,id)
}

  @Public()
  @Post('/uploadlessonvideo')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/videos',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
      }
    })
  }))


// @Patch('uploadlessonvideo')
// @UseInterceptors(
//   FileInterceptor(
//     'file',{
//       storage:diskStorage({
//         destination:'./uploads/videos'
//         ,filename:(req,file,cb)=>{
//           const uniqueName=`${Date.now()}-${file.originalname}`;
//           cb (null,uniqueName)
//         }
//       })
//     }
//   )
// )

async saveVideoLesson(//@Query('id') id:number,
@UploadedFile() file:Express.Multer.File,){
return await this.coursesService.saveVideoLesson(//id,
  file,);
}




  @Public()
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/videos',
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}-${file.originalname}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )

  async uploadVideo(@UploadedFile() file: Express.Multer.File) {
    return this.coursesService.saveVideo(file);
  }
  
  //
//   @Public()
// @Get('page')
// async getPdfPage(
//   @Query('id') id: string,
//   @Query('pageNumber') pageNumber: number,
// ) {
//   return this.coursesService.getPdfPage(id, pageNumber);
// }

  @Public()
@Get(':id/download')
async downloadPdf(
  @Param('id') id:number,
  // @Param('lessonID') lessonID:string,
@Res() res:Response

){const pdf =await this.lesson.findOne({where:{id,}}) 
res.setHeader('content-Type','application/pdf');
res.setHeader('content-Disposition',`attachment; filename=${pdf.name}`)
res.send(pdf.fileData);
}
 @Patch('/pay-with-code/charge')
  async payWithCode(@Req() req:Request,@Body('code') code: string ,@Query('courseId') courseId:number) {
    // console.log(req['student'].id);
    
    return await this.coursesService.payWithCode(req['user'].id, code,courseId);
  }
   @Patch('generate')
  async generate(@Body() body: { courseId: number }) {
    return await this.coursesService.generatesCode(body.courseId);
  }
@Patch ('')
async pdfcreate(){}
@Public()
@Patch('updatepdf/:id')

@UseInterceptors(FileInterceptor('file', {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      callback(null, uniqueSuffix + extname(file.originalname));
    }
  })
}))
async updatePdf(@Param('id') id:number,
@UploadedFile() file:Express.Multer.File,
){
  return this.coursesService.updatePdf(id,file)
}

// @Get ('pdf')
// async pdf (){
// const pdfExist=  await this .coursesService.pdf({})
// }

@Public()
 @Get('playy/:id')
 async streamVideolesson(@Param('lesson_id') lesson_id :number,
//  ,@Req () req:Request,
 @Res() res:Response
 ){
//  console.log(req['student'].id);
  
  const video =await this.coursesService.findByIdlesson(
    // ,
    lesson_id,)
  if(!video){
    return res.status(404).send('Video not found')
  }
  return res.sendFile(join(process.cwd(),video.path))
 }

// path
// @Public()
// @Get(){}
// @Public()
// @Get('')
// async stream(){
//   const video=await this.coursesService.get
// } 
@Public ()
@Get('play/:id')
async streamVideo(@Param('id') id: string, @Res() res: Response) {
    const video = await this.coursesService.getVideo(+id);
    if (!video) {
      return res.status(404).send('Video not found');
    }
    return res.sendFile(join(process.cwd(), video.path));
  
}

@Post()
courseVideo(){}
  @Get('/pagination')
  withpagination(@Query() paginationDto:CreateCourseDto){
    const { page, limit } = paginationDto;
  
  
    const offset = (page - 1) * limit;
  return this.coursesService.getpagination(offset,limit)
  
  }
  @Get('/name')
  findOne(@Query('name') name?: string, @Query('grade') grade?: string) {
      if (!name || !grade) {
          throw new BadRequestException('Both name and grade must be provided');
      }
      return this.coursesService.findOne(name, grade);
  }
  
  @Get('/type')
  findtype(@Query('type') type?: string,
 

) {
    const course= this.coursesService.findtype(type);
    return course
  }
  @Get('/month_by_year')
  findmonth_by_year(@Query('month_by_year') month_by_year?: string,
 

) {
    const course= this.coursesService.findmonth_by_year(month_by_year);
    return course
  }
  @Get('/bytype')
  bytypetoday(@Query('type') type:string){
const types=this.coursesService.bytypetoday(type);
return types
  }
  @Get('/all')
async findmany (){
  return await this.coursesService.findmany();
}

@Get('/coursestudnum')
async getcourseNumStudent(@Query('id') id?:number,@Query('page') page?:number,@Query('limit')  limit?:number){
  return await this.coursesService.getcourseNumStudent(id,page,limit);
}
@Get('/onecourse')
async getonecourseStudent(
  @Query('id') id?: string,
  @Query('page') page?: string,
  @Query('limit') limit?: string
) {
  const courseId = parseInt(id as string);
  const pageNum = parseInt(page || '1');
  const limitNum = parseInt(limit || '9');
  return await this.coursesService.getonecourseStudent(courseId, pageNum, limitNum);
}


// @Get('/students')

@Get('/course')
async getCourse(
  @Query('id') id: number,
  @Req() req?: Request,
  @Query('page') page = 1,
  @Query('limit') limit = 9,
) {
  const userId = req['user']['id']
  return await this.coursesService.getCourseWithStudents(id, userId, page, limit);
}
@Get('findoneuser')

async findbyId(@Query('id') id:number,@Req() req
,@Query('page') page?:number
,@Query('limit') limit?:number,//@Query('attendance') attendance?:boolean


)
{
  // console.log('page',page);
  // console.log('limit',limit);
  
  return await this .coursesService.findbyId(id,req.user.id,page,limit,//attendance
 
  )  
}
 
@Get('/allbystudents')
async findAll(@Query('id') id?:number,@Query('page') page?:number
,@Query('limit') limit?:number){
  return await this.coursesService.findAll(id,page,limit);
}

@Get('/all/:id')
byCenterName2(@Param('id') id:number ){
 



  return this.coursesService.byCenterName2(id)
}


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }


// @Public()
// @Get(':id/page/:pageNumber')
// async getPdfPages(
//   @Param('id') id: string,
//   @Param('pageNumber') pageNumber: number,
//   @Res() res: Response,
// ) {
//   const pdfBuffer = await this.coursesService.getPdfPage(id, Number(pageNumber));

//   res.set({
//     'Content-Type': 'application/pdf',
//     'Content-Disposition': `inline; filename="page-${pageNumber}.pdf"`,
//   });

//   res.send(pdfBuffer);
// }

  @Public()
  @Get(':id')
  async getPdf(@Param('id') id: number, @Res() res: Response) {
    const pdf = await this.coursesService.getPdfById(id);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${pdf.originalName}"`);
    
    const fileBuffer = fs.readFileSync(pdf.filePath);
    res.send(fileBuffer);
  }

  // @Public()
  // @Get(':id/page/:pageNumber')
  // async getPdfPage(
  //   @Param('id') id: string,
  //   @Param('pageNumber', ParseIntPipe) pageNumber: number,
  //   @Res() res: Response,
  // ) {
  //   const pdf = await this.coursesService.getPdfById(id);
  //   const pageBuffer = await this.coursesService.getPdfPage(id, pageNumber);
    
  //   res.setHeader('Content-Type', 'application/pdf');
  //   res.setHeader('Content-Disposition', `inline; filename="page-${pageNumber}-${pdf.originalName}"`);
  //   res.send(pageBuffer);
  // }

  @Public()
  @Get()
  async getAllPdfs() {
    const pdfs = await this.coursesService.getAllPdfs();
    return pdfs.map(pdf => ({
      id: pdf.id,
      originalName: pdf.originalName2,
      totalPages: pdf.totalPages,
      createdAt: pdf.createdAt,
    }));
  }

  @Public()
  @Delete(':id')
  async deletePdf(@Param('id') id: number) {
    await this.coursesService.deletePdf(id);
    return { message: 'Lesson deleted successfully' };
  }
  @Patch('/update/charge')
  async recharge(@Body() dto: RechargeDto, @Req() req) {
    const userId = req['user'].id || 1; 
    return this.coursesService.useRechargeCard(dto, userId);
  }



@Post('addtocart/:id')
async addToCart(@Req() req:Request,@Param('id') id:number,){
return await this.coursesService.addToCart(req['user'].id,id);
}


 @Public()
  @Post('upload/pdf')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/pdfs',
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}-${file.originalname}`;
          cb(null, uniqueName);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
          cb(null, true);
        } else {
          cb(new Error('Only Lesson files are allowed'), false);
        }
      },
    }),
  )
  async uploadPdf(@UploadedFile() file: Express.Multer.File) {
    const pdf = await this.coursesService.savePdf(file);
    return {
      message: 'Lesson uploaded successfully',
      pdf: {
        id: pdf.id,
        filename: pdf.filename2,
        originalName: pdf.originalName2,
        totalPages: pdf.totalPages,
        createdAt: pdf.createdAt,
      },
    };
  }
//  @Public()
//   @Get('images/:lessonId')
//   async getPdfImages(@Param('lessonId') lessonId: string) {
//     return await this.coursesService.getPdfImages(lessonId);
//   }

  @Public()
  @Get('files/images/:path(*)')
  async serveImage(@Param('path') imagePath: string, @Res() res: Response) {
    const fullPath = path.join('./uploads/images', imagePath);
    
    if (fs.existsSync(fullPath)) {
      res.sendFile(path.resolve(fullPath));
    } else {
      res.status(404).send('Image not found');
    }
  }
}














