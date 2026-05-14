import { BadRequestException, ConflictException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { RechargeDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { Student } from 'src/students/entities/student.entity';
import { CourseAttend } from 'src/course_attend/entities/course_attend.entity';
import { Section } from 'src/sections/entities/section.entity';
import { CourseInfo } from 'src/course_info/entities/course_info.entity';
import { Lesson, TrackProgressDto } from 'src/teacher/lesson/entities/lesson.entity';
import { Cart } from 'src/cart/entities/cart.entity';
export declare class CoursesService {
    private readonly Repository;
    private readonly course_attend;
    private readonly Repository2;
    private readonly courseinfo;
    private readonly section;
    private readonly cartRepo;
    private readonly lesson;
    constructor(Repository: Repository<Course>, course_attend: Repository<CourseAttend>, Repository2: Repository<Student>, courseinfo: Repository<CourseInfo>, section: Repository<Section>, cartRepo: Repository<Cart>, lesson: Repository<Lesson>);
    getallCourses(id: number): Promise<NotFoundException | {
        success: boolean;
        course: Course[];
    }>;
    getbysectionid(id: number, section_id: number): Promise<{
        success: boolean;
        course: CourseInfo[];
        percent: number;
        completedLessons: number;
        totalLessons: number;
    }>;
    getsectionid(id: number, lesson_id: number): Promise<ConflictException | {
        success: boolean;
        course: CourseInfo[];
    }>;
    getlessonid(id: number, section_id: number): Promise<ConflictException | {
        success: boolean;
        course: CourseInfo[];
    }>;
    saveVideo(file: Express.Multer.File): Promise<Course>;
    saveVideoLesson(file: Express.Multer.File): Promise<{
        lesson: Lesson;
    }>;
    getVideo(id: number): Promise<Course>;
    updatePdf(id: number, file: Express.Multer.File): Promise<Lesson>;
    trackVideoProgress(lessonId: number, contentId: number, dto: TrackProgressDto): Promise<{
        percentage: number;
    }>;
    updateSectionPercent(sectionId: number): Promise<{
        percent: number;
    }>;
    findByIdlesson(Lesson_id: number): Promise<Lesson>;
    findById(id: number): Promise<Course>;
    withpaginating(offset: number, limit: number): Promise<Course[] | {
        success: boolean;
        message: any;
    }>;
    allcourses(): Promise<Course[] | {
        success: boolean;
        message: any;
    }>;
    findOne(name: string, grade: string): Promise<Course>;
    getpagination(offset: number, limit: number): Promise<Course[]>;
    findmonth_by_year(month_by_year: string): Promise<Course>;
    bytypetoday(type: string): Promise<Course>;
    findtype(type: string): Promise<Course>;
    update(id: number, updateCourseDto: UpdateCourseDto): string;
    createPDF(file: Express.Multer.File): Promise<Lesson>;
    getPDF(id: number): Promise<Lesson>;
    getAllPDFs(): Promise<Lesson[]>;
    reorderPages(id: number, newOrder: number[]): Promise<Lesson>;
    deletePDF(id: number): Promise<void>;
    remove(id: number): string;
    findcoursehasstudents(): Promise<Course[]>;
    findAll(page: number, limit: number, id: number): Promise<Course | ForbiddenException>;
    getcourseNumStudent(id?: number, page?: number, limit?: number): Promise<Course[] | NotFoundException>;
    getonecourseStudent(id: number, page?: number, limit?: number): Promise<Course | NotFoundException>;
    findbyId(id: number, userId: any, page?: number, limit?: number): Promise<Course | ForbiddenException | BadRequestException>;
    getCourseWithStudents(id: number, userId?: number, page?: number, limit?: number): Promise<Course | NotFoundException | BadRequestException>;
    findmany(): Promise<Course[]>;
    findbytype(): Promise<Course[]>;
    findby(name: string, phoneNum: string, email: string, id: number): Promise<Course[]>;
    byCenterName2(id: number): Promise<Course[]>;
    savePdf(file: Express.Multer.File): Promise<Lesson>;
    getPdfInfo(pdfId: number): Promise<Lesson>;
    private extractPageMetadata;
    getPdfById(id: number): Promise<Lesson>;
    getAllPdfs(): Promise<Lesson[]>;
    deletePdf(id: number): Promise<void>;
    generateCode(): string;
    payWithCode(id: number, code: string, courseId: number): Promise<{
        message: string;
        courseId: number;
        remainingBalance: number;
        amountPaid: number;
    }>;
    private getCoursePrice;
    generatesCode(id: number): Promise<import("typeorm").UpdateResult>;
    generateCard(id: number): Promise<{
        message: string;
        code: string;
        amount: number;
    }>;
    addToCart(userId: number, courseId: number): Promise<{
        success: boolean;
        message: string;
        cartItem: {
            course: {
                id: number;
                price: number;
            };
        };
    }>;
    useRechargeCard(dto: RechargeDto, userId: number): Promise<{
        message: string;
        balance: number;
    }>;
}
