import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Request } from 'express';
import { Userquestion } from '../userquestion/entities/userquestion.entity';
import { Repository } from 'typeorm';
import { Content } from 'src/content/entities/content.entity';
import { Lesson } from './entities/lesson.entity';
import { Section } from 'src/sections/entities/section.entity';
export declare class LessonController {
    private readonly lessonService;
    private readonly userquestion;
    private readonly contentRepo;
    private readonly lessonRepo;
    private readonly lessons;
    private readonly sectionRepo;
    constructor(lessonService: LessonService, userquestion: Repository<Userquestion>, contentRepo: Repository<Content>, lessonRepo: Repository<Lesson>, lessons: Repository<Lesson>, sectionRepo: Repository<Section>);
    create(createLessonDto: CreateLessonDto): Promise<({
        question_name: string;
        name: string;
        type: string;
        question: string;
        answer: string;
    } & Lesson) | {
        success: boolean;
        message: string;
    }>;
    findAll(): Promise<Lesson[]>;
    lessontype(title: string, req: Request, sectionId: number): Promise<{
        course: import("../../course_info/entities/course_info.entity").CourseInfo[];
    }>;
    getLessonQuestions(id: number, page?: number, limit?: number): Promise<Lesson>;
    deletelesson(id: number): Promise<import("typeorm").DeleteResult>;
    addlesson(): Promise<Lesson>;
    addalllessonstocart(sectionId: number): Promise<import("../../cart/entities/cart.entity").Cart[]>;
    getSolvedPercent(sectionId: number): Promise<0 | {
        percent: number;
    }>;
    getSolvedQuestionsPercentByLesson(lessonId: number): Promise<{
        percent: number;
        lessonId?: undefined;
    } | {
        lessonId: number;
        percent: number;
    }>;
    findOne(id: string): string;
    update(id: string, updateLessonDto: UpdateLessonDto): string;
    remove(id: string): string;
    getLessonViewPercent(lessonId: number): Promise<{
        lessonId: number;
        percent: number;
    }>;
    markVideoWatched(lessonId: number): Promise<{
        message: string;
        g?: undefined;
    } | {
        g: {
            lessonId: number;
            percent: number;
        };
        message: string;
    }>;
}
