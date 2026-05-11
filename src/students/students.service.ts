import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student,  } from './entities/student.entity';import * as path from 'path';

import { Like, Repository } from 'typeorm';
import { User } from 'src/teacher/users/entities/user.entity';
import { Image } from 'src/teacher/images/entities/image.entity';
import { Exam } from 'src/teacher/exams/entities/exam.entity';
import { addAnswerDto, createstudDto, CreateStudentDto, sendOtpDTO, UpdateStudentDtoinfo } from './dto/create-student.dto';
import { twilioService } from 'common/smsotp';
// import { AuthGuard } from '@nestjs/passport';
// import { Student } from 'src/students/entities/student.entity';
import { UpdateStudentCourseDto } from './../student_course/dto/update-student_course.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Image) private readonly imageRepository:Repository<Image>,
    @InjectRepository(User) private readonly user:Repository<User>,
    @InjectRepository(Exam) private readonly examrepo:Repository<Exam>,
    // @InjectRepository(Userquestion) private readonly userques:Repository<Userquestion>,
 @InjectRepository(Student) private readonly repository:Repository<Student>
,private readonly twilioservice:twilioService
){}
  // create(createStudentDto: CreateStudentDto) {
  //   return 'This action adds a new student';
  // }

async sendSmsOtp(sendOtpDTO:sendOtpDTO){
const {phoneNum}=sendOtpDTO;
const otp= Math.floor(100000 + Math.random() * 900000).toString();
const createotp= await this.repository.create({phoneNum,otp,createdAt:new Date()})
await this.twilioservice.sendsmsotp(phoneNum,otp)
return createotp;
}

  async searchStudents(search: string): Promise<Student[]> {
    return this.repository.find({
      where: [
        { name: Like(`%${search}%`) },
        { email: Like(`%${search}%`) },
        { phoneNum: Like(`%${search}%`) },
      ],
    });
  }

  async searchCourseId(search: string,id:number): Promise<Student[]> {
    return  await this.repository.find({
      where: [
        { name: Like(`%${search}%`),    course:{id:id}},
        { email: Like(`%${search}%`),    course:{id:id} },
        { phoneNum: Like(`%${search}%`) ,     course:{id:id}},
    
      ],
   relations:['course'] });
  }

async mycourses(studentId: number) {
  const student = await this.repository.findOne({
    where: { id: studentId },
    relations: ['courses','courses.users'], // make sure we load courses
  });

  if (!student) {
    throw new NotFoundException('student not found');
  }

  if (!student.courses || student.courses.length === 0) {
    throw new ConflictException('course not found');
  }

  // If you just want to return the student with their courses
  return student;

  // Or if you want to return the full student + their courses
  // return student;
}



  async findbyId(id:number,userId,page=1,limit=9,attendence:boolean,exam_name:string){
const skip=(page-1)*limit;
// if(student )

  const student= await this.repository.findOne({
  where:{id:id,sections:{userId:userId,},exam:{attendence:attendence,exam_name:exam_name}}
    ,relations:{ sections:true,courses:true
 ,course:{exam:true} ,exam:true }})
  const student2= await this.repository.findOne({
  where:{id:id,sections:{userId:userId,},exam:{attendence:true,}}
    ,relations:{ sections:true,courses:true
 ,course:{exam:true} ,exam:true }})
  const student3= await this.repository.findOne({
  where:{id:id,sections:{userId:userId,},exam:{attendence:false,}}
    ,relations:{ sections:true,courses:true
 ,course:{exam:true} ,exam:true }})
//  if(!student)


//  console.log('ids',+Number(id));
 
 if(!student)
  
  return new ForbiddenException("there is no student");
 if(isNaN(id))
  
  return new BadRequestException("nanid");

if(student){

  student.exam =student.exam ?.slice (skip,skip+limit)
  student2.exam =student2.exam ?.slice (skip,skip+limit)
  student3.exam =student3.exam ?.slice (skip,skip+limit)
  student.exam.map(exam=>exam.attendence==true?student2:student3)
  // student.exam.map(exam=>exam.exam_name.length!=0?student:new ForbiddenException())
return student
}
 }
//  async findbyId(id:number,userId,page=1,limit=9,attendance:boolean

//  ){
// const skip=(page-1)*limit;
// // if(student )
//   const student= await this.repository.findOne({
//   where:{id:id,attendance:true,sections:{userId:userId,}}
//     ,relations:{ sections:true,courses:true
//  ,course:{exam:true} ,exam:true }})
//   const student2= await this.repository.findOne({
//   where:{id:id,attendance:false,sections:{userId:userId,}}
//     ,relations:{ sections:true,courses:true
//  ,course:{exam:true} ,exam:true }})
// //  if(!student)


// //  console.log('ids',+Number(id));
 
//  if(!student)
  
//   return new ForbiddenException("there is no student");
//  if(isNaN(id))
  
//   return new BadRequestException("nanid");
// if(attendance){
//   if(attendance==true)
    
    
//     {
//       student.exam =student?.exam ?.slice (skip,skip+limit)
//       return student;}
//       else 
      
//       {

//  student2.exam =student2?.exam ?.slice (skip,skip+limit)
//  return student2
// }
 
// }else{
  
//   const all= await this.repository.findOne({
//     where:{id:id,sections:{userId:userId,}}
//     ,relations:{ sections:true,courses:true
//       ,course:{exam:true} ,exam:true }})
//   all.exam =all.exam ?.slice (skip,skip+limit)
  
// }
//  }

async addAnswer(id:number,addAnswerDto:addAnswerDto){
const students=await this.repository.findOne({where:{id}})
// const question=await this.userques.findOne({students:{id}} )
if(!students)
  return new NotFoundException("")
  return await this.repository.update({id},{questions:{teacher_answer:addAnswerDto.teacher_answer} })
}

async getattendence(attendence:boolean,id:number){
const students=await this.repository.findOne({where:{exam:{attendence:attendence},id}})


 
  if(students.attendance==true)
  return await this.repository.findOne({where:{attendance:true,id,}})
else
  return await this.repository.findOne({where:{attendance:false,id},})

}

  async getpagination(offset:number,limit:number){

    return  await this.repository.find({skip:offset,take:limit,},)

    }
    
  async getpaginationid(offset:number,limit:number,id:number){

    return  await this.repository.find({skip:offset,take:limit,where:{course:{id:id}}})

    }
 async handleFileUpload(id: number, file: Express.Multer.File) {
   try{
    if (!file) {
    return new BadRequestException('No file uploaded');
  }

  const student = await this.repository.findOne({ where: { id ,},relations:['images'] });
  if (!student) {
    return  new ForbiddenException('student not found');
  }
  

// student.img = `/uploads/${file.filename}`;
student.img = `/uploads/${file.filename}`;
  // const newImage = this.imageRepository.create({
  //   url: file.path,  
  //   student: student,      
  // });
// console.log('Uploaded file path:', file.path);
  // console.log('Serving uploads from:', path.join(__dirname, '..', 'uploads'));

  // await this.imageRepository.save(newImage);

  // student.images.push(newImage);
  await this.repository.save(student,);

  return { message: 'File uploaded successfully', imagePath: student.img, };}catch(e){console.log(e);
    return e;
  } 
  }
   
     async typeonline(coursetype:string){
        if(coursetype=='all')
          return await this.repository.find()
        
          return  await this.repository.find({where:{coursetype:coursetype}})
         }
 async findAll() {
    return await this.repository.find() ;
  } 
  async getLastImage(students: number) {
    return await this.imageRepository.find({
      where: { user: { id: students } },  
      order: { id: 'DESC' },  
      relations: ['students'], 
    });
  }
  // findOne(id: number) {
  //   return `This action returns a #${id} student`;
  // }

  // update(id: number, updateStudentDto: UpdateStudentDto) {
  //   return `This action updates a #${id} student`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} student`;
  // }
   async search(search: string): Promise<Exam[]> {
    
    // let lesson=this.lessonsRepository.
    return this.examrepo.find({
        where: [
          { exam_name: Like(`%${search}%`) },
          {lessons :{name: Like(`%${search}%`)} },
        ],
      });
    }
    async saveinfo (
       createstudDto:createstudDto){
 
      const{fullname,name,email,
        stud_school,grade,branch,mother_phone_num
        ,father_phone_num,city,cityPlace,Location,buildingNum
        ,homeNum ,uniqueDescription }=createstudDto;
     const stu:Partial<Student>={
fullname,name,email,stud_school,grade,branch,mother_phone_num,father_phone_num,city,cityPlace,Location,buildingNum,homeNum,uniqueDescription
     }
   return this.repository.create(stu)
    }
    async update(UpdateStudentDto:UpdateStudentDtoinfo,id:number){
// const {branch,center
//   ,city,cityPlace,coursetype,createdAt,email,facebookLink,father_phone_num,isActive,mother_phone_num,name,parent1,parent2,phoneNum,picture,provider,role,semester,stud_school,
// }=UpdateStudentDto
  const findbyid=await this.repository.findOne({where:{id}});
  if(findbyid.id!=id)
    return new ConflictException('not found student')
const student:Partial<Student>={
...UpdateStudentDto,
}
return this.repository.update({id},student,)
}

async profile(  id:number){
  
  return await this.repository.findOne({where:{id},relations:['courses']})
}

}



