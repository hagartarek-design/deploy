import { AttachmentsService } from './attachments.service';
import { CreateAttachmentDto } from './dto/create-attachment.dto';
import { UpdateAttachmentDto } from './dto/update-attachment.dto';
import { Request } from 'express';
export declare class AttachmentsController {
    private readonly attachmentsService;
    constructor(attachmentsService: AttachmentsService);
    addToCart(req: Request, id: number): Promise<{
        success: boolean;
        message: string;
        cartItem: {
            attachment: {
                id: number;
                price: number;
            };
        };
    }>;
    addlessontocart(req: Request, id: number): Promise<import("@nestjs/common").ConflictException | {
        success: boolean;
        message: string;
        cartItem: {
            lesson: {
                id: number;
                price: number;
            };
        };
    }>;
    findused(): Promise<import("@nestjs/common").ConflictException | import("./entities/attachment.entity").Attachment[]>;
    findunused(): Promise<import("@nestjs/common").ConflictException | import("./entities/attachment.entity").Attachment[]>;
    create(createAttachmentDto: CreateAttachmentDto): Promise<import("./entities/attachment.entity").Attachment>;
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
            student?: import("../students/entities/student.entity").Student;
            cart?: import("../cart/entities/cart.entity").Cart[];
            status?: string;
            createdAt: Date;
        }[];
    }>;
    findOne(id: string): string;
    update(id: string, updateAttachmentDto: UpdateAttachmentDto): string;
    remove(id: string): string;
}
