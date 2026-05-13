import { SectionsService } from './sections.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { Request } from 'express';
export declare class SectionsController {
    private readonly sectionsService;
    constructor(sectionsService: SectionsService);
    savesection(createSectionDto: CreateSectionDto, req: any): Promise<{
        course: import("../courses/entities/course.entity").Course;
        user: any;
        description: string;
        name: string;
        viewingWatching: number;
        price: number;
    } & import("./entities/section.entity").Section>;
    withpaginatingsections(req: any, paginationDto?: UpdateSectionDto): Promise<import("./entities/section.entity").Section[]>;
    allsections(req: any): Promise<import("./entities/section.entity").Section[]>;
    mysections(): Promise<import("./entities/section.entity").Section[]>;
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
    isEnrolled(req: Request, sectionId: number): Promise<{
        enrolled: boolean;
    }>;
    payWithCode(req: Request, code: string, sectionId: number): Promise<{
        message: string;
        sectionId: number;
        remainingBalance: number;
        amountPaid: number;
    }>;
    remove(id: string, req: any): Promise<import("typeorm").DeleteResult>;
}
