import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from './entities/lesson.entity';
import { Repository } from 'typeorm';
import { CourseInfo } from 'src/course_info/entities/course_info.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { Content } from 'src/content/entities/content.entity';
export declare class LessonService {
    private readonly lessons;
    private readonly courseInfo;
    private readonly cartRepo;
    private readonly contentRepo;
    constructor(lessons: Repository<Lesson>, courseInfo: Repository<CourseInfo>, cartRepo: Repository<Cart>, contentRepo: Repository<Content>);
    addlesson(): Promise<Lesson>;
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
    getLessonQuestions(id: number, page?: number, limit?: number): Promise<Lesson>;
    findAll(): Promise<Lesson[]>;
    deletelesson(id: number): Promise<import("typeorm").DeleteResult>;
    getOrCreateCart(userId: number): Promise<Cart>;
    getSolvedQuestionsPercentBySection(sectionId: number): Promise<0 | {
        percent: number;
    }>;
    addalllessonstocart(sectionId: number): Promise<Cart[]>;
    lessontype(title: string, id: number, sectionId: number): Promise<{
        course: CourseInfo[];
    }>;
    findOne(id: number): string;
    update(id: number, updateLessonDto: UpdateLessonDto): string;
    remove(id: number): string;
}
