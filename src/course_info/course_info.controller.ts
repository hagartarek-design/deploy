import { Controller, Get, Post, Body, Patch, Param, Delete,Query, UseInterceptors, UploadedFile, Res} from '@nestjs/common';
import { CourseInfoService } from './course_info.service';
import { CreateCourseInfoDto } from './dto/create-course_info.dto';
import { UpdateCourseInfoDto } from './dto/update-course_info.dto';
// import { Public } from 'common/decorator/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { join } from 'path';
import { Public } from 'src/common/decorator/public.decorator';


@Controller('course-info')
export class CourseInfoController {
  constructor(private readonly courseInfoService: CourseInfoService) {}

  // @Post()
  // create(@Body() createCourseInfoDto: CreateCourseInfoDto) {
  //   return this.courseInfoService.create(createCourseInfoDto);
  // }
  @Delete('delete/:id')
  async deletecourse_attend(@Param('id') id:string){
    return await this.courseInfoService.deletecourse_attend(Number(id))
  }
  @Get()
  findmany() {
    return this.courseInfoService.findmany();
  }
  @Get('/all')
  getall(){
    return this.courseInfoService.getall()
  }
  @Get()
  dropdown(@Query('id') id :string) {
    return this.courseInfoService.dropdown(Number(id));
  }


  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCourseInfoDto: UpdateCourseInfoDto) {
  //   return this.courseInfoService.update(+id, updateCourseInfoDto);
  // }
//  @Public()
@Patch('uploadforlesson') 
@UseInterceptors(FileInterceptor('file',{
  storage:diskStorage({
    destination:'/upload/videos',
filename:(req,file,cb)=>{
  const uniqueName=`${Date.now()}-${file.originalname}`;
  cb(null ,uniqueName)
}
  })

}))

@Patch('upload')
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

  async uploadVideo(@UploadedFile() file: Express.
  Multer.File ,@Query('id') id:number) {
    return this.courseInfoService.saveVideo(file,id);
  }
@Public ()
  @Get('play/:id')
  async streamVideo(@Param('id') id: string, @Res() res: Response) {
    const video = await this.courseInfoService.getVideo(+id);
    if (!video) {
      return res.status(404).send('Video not found');
    }
    return res.sendFile(join(process.cwd(), video.path));
  
}
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.courseInfoService.remove(+id);
  // }
   @Get('/pagination')
    withpagination(@Query() paginationDto:CreateCourseInfoDto){
      const { page, limit } = paginationDto;
    
    
      const offset = (page - 1) * limit;
    return this.courseInfoService.getpagination(offset,limit)
    
    }

}
