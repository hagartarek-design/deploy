import { BadRequestException } from '@nestjs/common';
import { StudentsService } from './students.service';
import { addAnswerDto, CreateStudentDto, createstudDto, sendOtpDTO, UpdateStudentDtoinfo } from './dto/create-student.dto';
import { Request } from 'express';
export declare class StudentsController {
    private readonly studentsService;
    constructor(studentsService: StudentsService);
    sendSmsOtp(sendOtpDTO: sendOtpDTO): Promise<import("./entities/student.entity").Student>;
    typeonline(coursetype: string): Promise<import("./entities/student.entity").Student[]>;
    searchStu(search: string): Promise<import("./entities/student.entity").Student[]>;
    searchCourseId(search: string, id: number): Promise<import("./entities/student.entity").Student[]>;
    profile(req: Request): Promise<import("./entities/student.entity").Student>;
    search(search: string): Promise<import("../teacher/exams/entities/exam.entity").Exam[]>;
    mycourses(req: Request): Promise<import("./entities/student.entity").Student>;
    withpaginating(paginationDto: CreateStudentDto): Promise<import("./entities/student.entity").Student[]>;
    getpaginationid(paginationDto: CreateStudentDto, id: number): Promise<import("./entities/student.entity").Student[]>;
    addAnswer(id: number, addAnswerDto: addAnswerDto): Promise<import("@nestjs/common").NotFoundException | import("typeorm").UpdateResult>;
    upload(UpdateStudentDto: UpdateStudentDtoinfo, req: Request): Promise<import("@nestjs/common").ConflictException | import("typeorm").UpdateResult>;
    uploadFile(req: Request, file: Express.Multer.File): Promise<any>;
    findbyId(id: number, req: any, page?: number, limit?: number, attendence?: boolean, exam_name?: string): Promise<import("./entities/student.entity").Student | import("@nestjs/common").ForbiddenException | BadRequestException>;
    getattendence(attendence: boolean, id: number): Promise<import("./entities/student.entity").Student>;
    findAll(): Promise<import("./entities/student.entity").Student[]>;
    saveinfo(createstudDto: createstudDto): Promise<import("./entities/student.entity").Student>;
}
