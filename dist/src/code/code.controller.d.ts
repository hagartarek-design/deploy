import { CodeService } from './code.service';
import { Request } from 'express';
export declare class CodeController {
    private readonly codeService;
    constructor(codeService: CodeService);
    generate(body: {
        amount: number;
        count: number;
    }): Promise<import("./entities/code.entity").Code[]>;
    codes(page?: number, limit?: number): Promise<{
        message: string;
        codes: import("./entities/code.entity").Code[];
    }>;
    recharge(req: Request, body: {
        rechargeCode: string;
        amount: number;
    }): Promise<{
        success: boolean;
        message: string;
        added: number;
        totalBalance: number;
        code: string;
    }>;
    buy(req: Request, body: {
        courseId: number;
    }): Promise<{
        success: boolean;
        message: string;
        paid: number;
        remainingBalance: number;
    }>;
    buySection(req: Request, body: {
        sectionId: number;
    }): Promise<import("@nestjs/common").ConflictException | {
        success: boolean;
        message: string;
        paid: number;
        remainingBalance: number;
        isUsed: never;
    }>;
    buySheet(req: Request): Promise<{
        success: boolean;
        message: string;
        paid: number;
        remainingBalance: number;
        attachmentsBought: {
            id: number;
            price: number;
        }[];
    }>;
    clearcart(req: Request): Promise<void | import("@nestjs/common").ConflictException>;
}
