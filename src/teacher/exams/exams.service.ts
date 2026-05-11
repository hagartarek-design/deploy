import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { createExamDto, CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Exam } from './entities/exam.entity';
import { Like, Repository } from 'typeorm';
import { User } from 'src/teacher/users/entities/user.entity';

@Injectable()
export class ExamsService {
  constructor(
    @InjectRepository(User) private readonly userRepository:Repository<User>,
    
@InjectRepository(Exam) 
private readonly repository:Repository<Exam> 
){}
  create(createExamDto: CreateExamDto) {
    return this.repository.create({});
  }
    async uploadFile(id: number, file: Express.Multer.File, createExamDto: createExamDto) {
      try {
        if (!file) {
          throw new BadRequestException('No file uploaded');
        }
    
        const user = await this.userRepository.findOne({ where: { id:id }, relations: ['exam'] });
        if (!user) {
          throw new ForbiddenException('User not found');
        }
    
        user.examcardimg = file.path;
    
        const newSection =await this.repository.create({
           imgcart:file.path , 
          exam_name:createExamDto.exam_name,
            examprice:createExamDto.examprice,
            trials_number:createExamDto.trials_number,
            durationmin:createExamDto.durationmin,
       
            // totaldegree:createExamDto.showDegreeafter ,
          degree_success:createExamDto.degree_success
        //  , showDegreeBefore:createExamDto.showDegreeBefore,
          ,showdegreeEveryQues:createExamDto.showdegreeEveryQues,
          showDegreeafter:createExamDto.showDegreeafter,
          seedate:createExamDto.seedate,
          startdate:createExamDto.startdate,
         
          userId: user, });
    
        await this.repository.save(newSection);
    
        user.exam.push(newSection);
    
        await this.userRepository.save(user);
    
        return { 
          message: 'File uploaded successfully', 
          imagePath: user.cardimg,
          section: newSection,
        };
      } catch (e) {
        console.error(e);
        throw new  BadRequestException('Failed to upload file');
      }
    }
    



    async exam_offline_online( online?:boolean,page=1,limit=9){
        const skip=(page-1)*limit;
      const exam=await this.repository.find({skip,
    take: limit,where:{online},relations:['questions'] })
    console.log(Date.now());
    console.log(exam.map((e)=>e.startdate));
    
    const startdate=exam.map((e)=>
{
  console.log(Date.now() ,"  ",new Date(e.startdate).getTime());
  // console.log(Date.now().toString() ,"  ",new Date(e.startdate).getTime());
  
return Date.now() > new Date(e.startdate).getTime()
    }
)
console.log(startdate);

return { message :'exam online returned successfully',exam,startdate}

    }
    //  async handleFileUpload(id: number, file: Express.Multer.File) {
    //     try{
    //      if (!file) {
    //      return new BadRequestException('No file uploaded');
    //    }
     
    //    const exam = await this.repository.findOne({ where: { id ,},relations:['images'] });
    //    if (!exam) {
    //      return  new ForbiddenException('exam not found');
    //    }
       
     
      
    //    exam.imgcart = file.path;
    //    const newImage = this.imageRepository.create({
    //      examimg: file.path, 
    //      exam: exam,      
    //    });
     
     
    //    await this.imageRepository.save(newImage);
     
   
    //    exam.images.push(newImage);
    //    await this.repository.save(exam,);
     
    //    return { message: 'File uploaded successfully', imagePath: exam.imgcart, };}catch(e){console.log(e);
    //      return e;
    //    } 
    //    }
       
  async getpagination(page=1,limit=9){
  const skip=(page-1)*limit;
  const exam=  await this.repository.find({relations:['course'] ,  skip,
    take: limit,where:{online:false} 
  },)
  // exam.slice (skip,skip+limit)
 
   return exam }
  async getpaginationonline(page=1,limit=9){
  const skip=(page-1)*limit;
  const exam=  await this.repository.find({relations:['course'] ,  skip,
    take: limit,where:{online:true} 
  },)
  // exam.slice (skip,skip+limit)
 
   return exam }
  // findAll() {
  //   return `This action returns all exams`;
  // }
 async searchExams(search: string): Promise<Exam[]> {
  
  // let lesson=this.lessonsRepository.
  return this.repository.find({
      where: [
        { exam_name: Like(`%${search}%`) },
        {lessons :{name: Like(`%${search}%`)} },
      ],
    });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} exam`;
  // }

  // update(id: number, updateExamDto: UpdateExamDto) {
  //   return `This action updates a #${id} exam`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} exam`;
  // }
  remove(id:number){

    return this .repository.delete(id)
  }
}