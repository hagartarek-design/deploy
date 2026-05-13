import { ConflictException } from '@nestjs/common';
import { CreateAttachmentDto } from './dto/create-attachment.dto';
import { UpdateAttachmentDto } from './dto/update-attachment.dto';
import { Attachment } from './entities/attachment.entity';
import { Repository } from 'typeorm';
import { Course } from 'src/courses/entities/course.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { Student } from 'src/students/entities/student.entity';
import { Lesson } from 'src/teacher/lesson/entities/lesson.entity';
export declare class AttachmentsService {
    private readonly attatchRepository;
    private readonly courseRepository;
    private readonly cartRepository;
    private readonly studentRepository;
    private readonly lessonRepository;
    constructor(attatchRepository: Repository<Attachment>, courseRepository: Repository<Course>, cartRepository: Repository<Cart>, studentRepository: Repository<Student>, lessonRepository: Repository<Lesson>);
    create(createAttachmentDto: CreateAttachmentDto): Promise<Attachment>;
    addlessontocart(userId: number, lessonId: number): Promise<ConflictException | {
        success: boolean;
        message: string;
        cartItem: {
            lesson: {
                id: number;
                price: number;
            };
        };
    }>;
    addToCart(userId: number, attachmentId: number): Promise<{
        success: boolean;
        message: string;
        cartItem: {
            attachment: {
                id: number;
                price: number;
            };
        };
    }>;
    findused(): Promise<Attachment[] | ConflictException>;
    findunused(): Promise<Attachment[] | ConflictException>;
    findAll(status?: string): Promise<{
        courses: {
            assignmentCount: number;
            examCount: number;
            totalExamAssignment: number;
            id: number;
            cycle: string;
            price: number;
            countassign: number;
            code: string;
            isUsed: boolean;
            amount: number;
            assignments?: import("../assignments/entities/assignment.entity").Assignment[];
            exam?: import("../teacher/exams/entities/exam.entity").Exam[];
            student?: Student;
            cart?: Cart[];
            status?: string;
            createdAt: Date;
        }[];
    }>;
    findbyonline(): Promise<Attachment[]>;
    findbyoffline(): Promise<Attachment[]>;
    findOne(id: number): string;
    update(id: number, updateAttachmentDto: UpdateAttachmentDto): string;
    remove(id: number): string;
}
