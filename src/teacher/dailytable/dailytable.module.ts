import { Module } from '@nestjs/common';
import { DailytableService } from './dailytable.service';
import { DailytableController } from './dailytable.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dailytable } from './entities/dailytable.entity';
import { CourseInfo } from 'src/course_info/entities/course_info.entity';

@Module({imports:[TypeOrmModule.forFeature([Dailytable,CourseInfo])],
  controllers: [DailytableController],
  providers: [DailytableService],
})
export class DailytableModule {}
