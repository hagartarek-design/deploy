import { ConflictException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { Attachment } from 'src/attachments/entities/attachment.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Section } from 'src/sections/entities/section.entity';
import { Student } from 'src/students/entities/student.entity';
export declare class CartService {
    private readonly studentRepo;
    private readonly cartRepository;
    private readonly CourseRepository;
    private readonly attachtRepository;
    private readonly SectionRepository;
    constructor(studentRepo: Repository<Student>, cartRepository: Repository<Cart>, CourseRepository: Repository<Course>, attachtRepository: Repository<Attachment>, SectionRepository: Repository<Section>);
    private merchantCode;
    private secret;
    private endpoint;
    create(createCartDto: CreateCartDto): string;
    private sign;
    recharge(merchantRef: string, amount: number, customerMobile?: string): Promise<any>;
    verifyCallbackSignature(payload: any, signatureFromFawry: string): boolean;
    createPayment(merchantRef: string, amount: number, customerMobile?: string): Promise<any>;
    completeCoursePurchase(courseId: number): Promise<{
        message: string;
        remainingAmount: number;
        status: string;
    }>;
    attachfromcart(id: number): Promise<ConflictException | import("typeorm").DeleteResult>;
    findAll(): Promise<{
        data: {
            course: Course;
            attachment: Attachment;
            section: Section;
            lesson: import("../teacher/lesson/entities/lesson.entity").Lesson;
            id: number;
            student?: Student;
            userId: number;
        }[];
        length: number;
    }>;
    findOne(id: number): string;
    update(id: number, updateCartDto: UpdateCartDto): string;
    remove(id: number): string;
}
