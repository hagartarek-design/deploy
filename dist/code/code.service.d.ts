import { ConflictException } from '@nestjs/common';
import { CreateCodeDto } from './dto/create-code.dto';
import { UpdateCodeDto } from './dto/update-code.dto';
import { Code } from './entities/code.entity';
import { Student } from 'src/students/entities/student.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Repository } from 'typeorm';
import { Section } from 'src/sections/entities/section.entity';
import { Attachment } from 'src/attachments/entities/attachment.entity';
import { Cart } from 'src/cart/entities/cart.entity';
export declare class CodeService {
    private readonly cardRepo;
    private readonly userRepo;
    private readonly courseRepo;
    private readonly sectionRepo;
    private readonly attachmentRepo;
    private readonly cartRepo;
    private alreadyBought;
    constructor(cardRepo: Repository<Code>, userRepo: Repository<Student>, courseRepo: Repository<Course>, sectionRepo: Repository<Section>, attachmentRepo: Repository<Attachment>, cartRepo: Repository<Cart>);
    generateCards(amount: number, count: number): Promise<Code[]>;
    codes(page?: number, limit?: number): Promise<{
        message: string;
        codes: Code[];
    }>;
    rechargeCard(userId: number, rechargeCode: string, amount: number): Promise<{
        success: boolean;
        message: string;
        added: number;
        totalBalance: number;
        code: string;
    }>;
    buyCourse(userId: number, courseId: number): Promise<{
        success: boolean;
        message: string;
        paid: number;
        remainingBalance: number;
    }>;
    buySection(userId: number, sectionId: number): Promise<ConflictException | {
        success: boolean;
        message: string;
        paid: number;
        remainingBalance: number;
        isUsed: never;
    }>;
    clearcart(userId: number): Promise<void | ConflictException>;
    buySheet(userId: number): Promise<{
        success: boolean;
        message: string;
        paid: number;
        remainingBalance: number;
        attachmentsBought: {
            id: number;
            price: number;
        }[];
    }>;
    create(createCodeDto: CreateCodeDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCodeDto: UpdateCodeDto): string;
    remove(id: number): string;
}
