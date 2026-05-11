import { Module } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentController } from './enrollment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrollment } from './entities/enrollment.entity';
// import { Code } from 'typeorm';
import { Course } from 'src/courses/entities/course.entity';
import { Code } from 'src/code/entities/code.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Enrollment,Code,Course])],
  controllers: [EnrollmentController],
  providers: [EnrollmentService],
})
export class EnrollmentModule {}
