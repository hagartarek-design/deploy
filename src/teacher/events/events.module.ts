import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Course } from 'src/courses/entities/course.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Event,Course])],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
