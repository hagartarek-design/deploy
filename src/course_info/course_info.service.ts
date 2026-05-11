import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCourseInfoDto } from './dto/create-course_info.dto';
import { UpdateCourseInfoDto } from './dto/update-course_info.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseInfo } from './entities/course_info.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Repository } from 'typeorm';
import { Lesson } from 'src/teacher/lesson/entities/lesson.entity';

@Injectable()
export class CourseInfoService {
  constructor(
    @InjectRepository(CourseInfo) private readonly courseinfo :Repository<CourseInfo>
  ,  @InjectRepository(Course) private readonly course:Repository<Course>
  ,  @InjectRepository(Lesson) private readonly lesson:Repository<Lesson>

){}
getall(){
  try {
  return this.courseinfo.find({relations:['course','students']})
    
  } catch (error) {
    return {success:false,message:error.message}
  }
}
async getpagination(offset:number,limit:number){
  
  return  await this.courseinfo.find({skip:offset,take:limit,relations:['course','students']},)
  }
async saveVideoforlesson(file:Express.Multer.File,id:number){
const videoExist =await this.lesson.find({where:{id}});
if(!videoExist) return new ConflictException("no id found");
// const video =await this.courseinfo.update({id:id},{})
}
   async saveVideo(file: Express.Multer.File,id:number) {
    const videoExist=await this.courseinfo.findOne({where:{id}});
    if(!videoExist) return new ConflictException("no id found")
    const video =await this.courseinfo.update({id:id},{ 
      filename: file.filename,
      originalName: file.originalname,
      mimetype: file.mimetype,
      path: file.path,
    },);
    // console.log(videoExist);
    
    return video;
  }

  async getVideo(id: number) {
    return this.courseinfo.findOneBy({ id });
  }
async deletecourse_attend(id:number){
  try {
    const user=await this .courseinfo.findOne({where:{id}})
  return await this.courseinfo.delete(id)
    
  } catch (error) {
    return {
      success:false
      ,message:error
     
    }
    
  }
}
async dropdown(id:number){
  try {
  return await this .course.findOne({where:{id}})
    
  } catch (error) {
    return {
      success:false,
      message:error.message,


    }
  }
}
// create(createCourseInfoDto: CreateCourseInfoDto) {
//     return 'This action adds a new courseInfo';
//   }
 async findmany(){
   return await this.courseinfo.find();
  }
courseinfobycourse(){
  this.courseinfo.find({relations:['course']})
}

  // update(id: number, updateCourseInfoDto: UpdateCourseInfoDto) {
  //   return `This action updates a #${id} courseInfo`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} courseInfo`;
  // }
}
