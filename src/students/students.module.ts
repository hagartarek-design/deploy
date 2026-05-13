import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Course } from 'src/courses/entities/course.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthModule } from 'src/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../../common/Gaurds/auth.guard';
import { Image } from 'src/teacher/images/entities/image.entity';
import { User } from 'src/teacher/users/entities/user.entity';
import { multerConfig } from 'src/teacher/users/uploads/fileupload';
import { Exam } from 'src/teacher/exams/entities/exam.entity';
import { Userquestion } from 'src/teacher/userquestion/entities/userquestion.entity';
import { twilioService } from 'common/smsotp';
import { StudentCourse } from 'src/student_course/entities/student_course.entity';
import { AuthService } from 'src/auth/auth.service';

@Module( {
  imports: [
  
   AuthModule,
    MulterModule.register({
     storage:diskStorage({
      destination:'./uploads',
      filename:(req,file,cb)=>{
        const filename=`${Date.now()}-${file.originalname}`;
        cb(null,filename)
      }
      
     }) 
    }),
    TypeOrmModule.forFeature([Student,Course,Image,User,Exam,Userquestion,StudentCourse]),MulterModule.register(multerConfig),],
  controllers: [StudentsController],
  providers: [StudentsService,//AuthService,
  //    {
  //   provide: APP_GUARD,
  //   useClass: AuthGuard,
  // },
twilioService],
})
export class StudentsModule {}
