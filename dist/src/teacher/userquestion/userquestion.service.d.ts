import { ForbiddenException } from '@nestjs/common';
import { Userquestion } from './entities/userquestion.entity';
import { Repository } from 'typeorm';
import { Student } from 'src/students/entities/student.entity';
import { createanswerDto } from './dto/create-userquestion.dto';
import { Lesson } from '../lesson/entities/lesson.entity';
export declare class UserquestionService {
    private readonly questionRepository;
    private readonly lessons;
    private readonly studentsRepo;
    constructor(questionRepository: Repository<Userquestion>, lessons: Repository<Lesson>, studentsRepo: Repository<Student>);
    resultExamAssign(lessonId: number): Promise<{
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
    answerOfQuestion(id: number, student_answer: string): Promise<import("typeorm").UpdateResult>;
    answerOfQuestionexam(id: number, studentAnswerExam: string): Promise<{
        error: string;
        percent?: undefined;
    } | {
        percent: number;
        error?: undefined;
    }>;
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
    findAll(page?: number, limit?: number): Promise<Userquestion[] | ForbiddenException>;
    findOne(id: number): string;
    remove(id: number): string;
    addAnswer(createanswerDto: createanswerDto, id: number): Promise<Userquestion>;
}
