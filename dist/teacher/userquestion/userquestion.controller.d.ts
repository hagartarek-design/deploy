import { UserquestionService } from './userquestion.service';
import { createanswerDto } from './dto/create-userquestion.dto';
import { Lesson } from '../lesson/entities/lesson.entity';
import { Repository } from 'typeorm';
import { Userquestion } from './entities/userquestion.entity';
export declare class UserquestionController {
    private readonly userquestionService;
    private readonly lessons;
    private readonly questionrepo;
    constructor(userquestionService: UserquestionService, lessons: Repository<Lesson>, questionrepo: Repository<Userquestion>);
    addAnswer(createanswerDto: createanswerDto, id: any): Promise<Userquestion>;
    answerOfQuestion(id: number, student_answer: string): Promise<import("typeorm").UpdateResult>;
    getSolvedQuestionsPercentByLesson(lessonId: number): Promise<{
        percent: number;
        lessonId?: undefined;
    } | {
        lessonId: number;
        percent: number;
    }>;
    answerOfQuestionexam(id: number, studentAnswerExam: string): Promise<{
        error: string;
        percent?: undefined;
    } | {
        percent: number;
        error?: undefined;
    }>;
    resultExamAssign(lessonId?: number): Promise<{
        total: number;
        solvedPercent: number;
        restPercent: number;
        truePercent: number;
        falsePercent: number;
        choose: {
            solvedPercent: number;
            truePercent: number;
            falsePercent: number;
            degree?: undefined;
        };
        degree?: undefined;
        solved?: undefined;
        rest?: undefined;
        trueans?: undefined;
        falseans?: undefined;
    } | {
        total: number;
        degree: number;
        solvedPercent: number;
        solved: number;
        restPercent: number;
        rest: number;
        truePercent: number;
        trueans: number;
        falsePercent: number;
        falseans: number;
        choose: {
            degree: number;
            solvedPercent: number;
            truePercent: number;
            falsePercent: number;
        };
    }>;
    findAll(page?: number, limit?: number): Promise<Userquestion[] | import("@nestjs/common").ForbiddenException>;
    questions(lessonId: number, page?: number, limit?: number): Promise<{
        data: Userquestion[];
        currentPage: number;
        limit: number;
        total: number;
        totalPages: number;
    }>;
    lessonques(lessonId: number, page?: number, limit?: number): Promise<{
        data: Lesson[];
        currentPage: number;
        limit: number;
        total: number;
        totalPages: number;
    }>;
    questionsexams(examId: number, page?: number, limit?: number): Promise<{
        data: Userquestion[];
        currentPage: number;
        limit: number;
        total: number;
        totalPages: number;
    }>;
}
