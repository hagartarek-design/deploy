import { Module } from '@nestjs/common';
import { CodeService } from './code.service';
import { CodeController } from './code.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Code } from './entities/code.entity';
import { Student } from 'src/students/entities/student.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Section } from 'src/sections/entities/section.entity';
import { Attachment } from 'src/attachments/entities/attachment.entity';
import { Cart } from 'src/cart/entities/cart.entity';

// import { Code } from 'typeorm';


import { JwtService } from '@nestjs/jwt';
@Module({
  imports:[TypeOrmModule.forFeature([Code,Student,Course,Section,Attachment,Cart])],
controllers: [CodeController],
  providers: [CodeService,JwtService],
})
export class CodeModule {}
