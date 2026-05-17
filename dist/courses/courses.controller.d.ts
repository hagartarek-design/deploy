import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto, RechargeDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Lesson } from 'src/teacher/lesson/entities/lesson.entity';
export declare class CoursesController {
    private readonly coursesService;
    private readonly lesson;
    constructor(coursesService: CoursesService, lesson: Repository<Lesson>);
    getbysectionid(req: Request, section_id: number): Promise<{
        success: boolean;
        course: import("../course_info/entities/course_info.entity").CourseInfo[];
        percent: number;
        completedLessons: number;
        totalLessons: number;
    }>;
    getallCourses(req: Request): Promise<NotFoundException | {
        success: boolean;
        course: import("./entities/course.entity").Course[];
    }>;
    createCard(req: Request): Promise<{
        message: string;
        code: string;
        amount: number;
    }>;
    getsectionid(req: Request, lesson_id: number): Promise<import("@nestjs/common").ConflictException | {
        success: boolean;
        course: import("../course_info/entities/course_info.entity").CourseInfo[];
    }>;
    uploadPDF(file: Express.Multer.File): Promise<Lesson>;
    getAllPDFs(): Promise<Lesson[]>;
    getPDF(id: number): Promise<Lesson>;
    reorderPages(id: number, body: {
        pageOrder: number[];
    }): Promise<Lesson>;
    deletePDF(id: number): Promise<void>;
    withpaginating(paginationDto: CreateCourseDto): Promise<import("./entities/course.entity").Course[] | {
        success: boolean;
        message: any;
    }>;
    allcourses(): Promise<import("./entities/course.entity").Course[] | {
        success: boolean;
        message: any;
    }>;
    findby(name: string, phoneNum: string, email: string, id: number): Promise<import("./entities/course.entity").Course[]>;
    saveVideoLesson(file: Express.Multer.File): Promise<{
        lesson: Lesson;
    }>;
    uploadVideo(file: Express.Multer.File): Promise<import("./entities/course.entity").Course>;
    downloadPdf(id: number, res: Response): Promise<void>;
    payWithCode(req: Request, code: string, courseId: number): Promise<{
        message: string;
        courseId: number;
        remainingBalance: number;
        amountPaid: number;
    }>;
    generate(body: {
        courseId: number;
    }): Promise<import("typeorm").UpdateResult>;
    pdfcreate(): Promise<void>;
    updatePdf(id: number, file: Express.Multer.File): Promise<Lesson>;
    streamVideolesson(lesson_id: number, res: Response): Promise<void | Response<any, Record<string, any>>>;
    streamVideo(id: string, res: Response): Promise<void | Response<any, Record<string, any>>>;
    courseVideo(): void;
    withpagination(paginationDto: CreateCourseDto): Promise<import("./entities/course.entity").Course[]>;
    findOne(name?: string, grade?: string): Promise<import("./entities/course.entity").Course>;
    findtype(type?: string): Promise<import("./entities/course.entity").Course>;
    findmonth_by_year(month_by_year?: string): Promise<import("./entities/course.entity").Course>;
    bytypetoday(type: string): Promise<import("./entities/course.entity").Course>;
    findmany(): Promise<import("./entities/course.entity").Course[]>;
    getcourseNumStudent(id?: number, page?: number, limit?: number): Promise<import("./entities/course.entity").Course[] | NotFoundException>;
    getonecourseStudent(id?: string, page?: string, limit?: string): Promise<import("./entities/course.entity").Course | NotFoundException>;
    getCourse(id: number, req?: Request, page?: number, limit?: number): Promise<import("./entities/course.entity").Course | NotFoundException | BadRequestException>;
    findbyId(id: number, req: any, page?: number, limit?: number): Promise<import("./entities/course.entity").Course | import("@nestjs/common").ForbiddenException | BadRequestException>;
    findAll(id?: number, page?: number, limit?: number): Promise<import("./entities/course.entity").Course | import("@nestjs/common").ForbiddenException>;
    byCenterName2(id: number): Promise<import("./entities/course.entity").Course[]>;
    update(id: string, updateCourseDto: UpdateCourseDto): string;
    remove(id: string): string;
    getPdf(id: number, res: Response): Promise<void>;
    getAllPdfs(): Promise<{
        id: number;
        originalName: string;
        totalPages: number;
        createdAt: Date;
    }[]>;
    deletePdf(id: number): Promise<{
        message: string;
    }>;
    recharge(dto: RechargeDto, req: any): Promise<{
        message: string;
        balance: number;
    }>;
    addToCart(req: Request, id: number): Promise<{
        success: boolean;
        message: string;
        cartItem: {
            course: {
                id: number;
                price: number;
            };
        };
    }>;
    uploadPdf(file: Express.Multer.File): Promise<{
        message: string;
        pdf: {
            id: number;
            filename: string;
            originalName: string;
            totalPages: number;
            createdAt: Date;
        };
    }>;
    serveImage(imagePath: string, res: Response): Promise<void>;
}
