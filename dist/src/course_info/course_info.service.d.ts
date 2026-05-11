import { ConflictException } from '@nestjs/common';
import { CourseInfo } from './entities/course_info.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Repository } from 'typeorm';
import { Lesson } from 'src/teacher/lesson/entities/lesson.entity';
export declare class CourseInfoService {
    private readonly courseinfo;
    private readonly course;
    private readonly lesson;
    constructor(courseinfo: Repository<CourseInfo>, course: Repository<Course>, lesson: Repository<Lesson>);
    getall(): Promise<CourseInfo[]> | {
        success: boolean;
        message: any;
    };
    getpagination(offset: number, limit: number): Promise<CourseInfo[]>;
    saveVideoforlesson(file: Express.Multer.File, id: number): Promise<ConflictException>;
    saveVideo(file: Express.Multer.File, id: number): Promise<ConflictException | import("typeorm").UpdateResult>;
    getVideo(id: number): Promise<CourseInfo>;
    deletecourse_attend(id: number): Promise<import("typeorm").DeleteResult | {
        success: boolean;
        message: any;
    }>;
    dropdown(id: number): Promise<Course | {
        success: boolean;
        message: any;
    }>;
    findmany(): Promise<CourseInfo[]>;
    courseinfobycourse(): void;
}
