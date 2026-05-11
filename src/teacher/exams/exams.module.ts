import { Module } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { ExamsController } from './exams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exam } from './entities/exam.entity';
import { Lesson } from 'src/teacher/lesson/entities/lesson.entity';
import { Image } from 'src/teacher/images/entities/image.entity';
import { User } from 'src/teacher/users/entities/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from 'src/teacher/users/uploads/fileupload';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'common/Gaurds/auth.guard';
import { Attachment } from 'src/attachments/entities/attachment.entity';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { Student } from 'src/students/entities/student.entity';

@Module({
  imports:[//AuthModule,
    MulterModule .register(multerConfig),
    // JwtModule.register({
    //         secret: process.env.SECRET_KEY || 'your_secret_key',
    //         signOptions: { expiresIn: '1h' },
    //       }),
    TypeOrmModule.forFeature([Exam,Lesson,Image,User,Attachment,Student])],
  controllers: [ExamsController],
  providers: [ExamsService,JwtService,AuthService,
//  {
//     provide: APP_GUARD,
//     useClass: AuthGuard,
//   },
  ],
})
export class ExamsModule {}
