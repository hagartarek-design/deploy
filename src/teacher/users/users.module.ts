import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from './uploads/fileupload';
import { JwtModule } from '@nestjs/jwt';
import { Image } from 'src/teacher/images/entities/image.entity';
import { Section } from 'src/sections/entities/section.entity';
import { Course } from 'src/courses/entities/course.entity';
import { AuthService } from 'src/auth/auth.service';
import { Student } from 'src/students/entities/student.entity';

@Module({
  imports:[
        JwtModule.register({
        secret: process.env.SECRET_KEY || 'your_secret_key',
        signOptions: { expiresIn: '1h' },
      }),
    TypeOrmModule.forFeature([
    User,Image,Section,Course,Student
  ]),MulterModule.register(multerConfig),

],
  controllers: [UsersController],
  providers: [UsersService,AuthService
  
  ],
})
export class UsersModule {}
