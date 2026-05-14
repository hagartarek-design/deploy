import { CreateSectionDto } from './dto/create-section.dto';
import { Section } from './entities/section.entity';
import { Repository } from 'typeorm';
import { Student } from 'src/students/entities/student.entity';
import { Cart } from 'src/cart/entities/cart.entity';
export declare class SectionsService {
    private readonly sectionrepository;
    private readonly cartrepository;
    private readonly Studentrepository;
    constructor(sectionrepository: Repository<Section>, cartrepository: Repository<Cart>, Studentrepository: Repository<Student>);
    addToCart(userId: number, sectionid: number): Promise<{
        success: boolean;
        message: string;
        cartItem: {
            course: {
                id: number;
                price: number;
            };
        };
    }>;
    payWithCode(id: number, code: string, sectionId: number): Promise<{
        message: string;
        sectionId: number;
        remainingBalance: number;
        amountPaid: number;
    }>;
    private getSectionPrice;
    isEnrolled(id: number, sectionId: number): Promise<boolean>;
    savesection(createSectionDto: CreateSectionDto, userId: any): Promise<{
        course: import("../courses/entities/course.entity").Course;
        user: any;
        description: string;
        name: string;
        viewingWatching: number;
        price: number;
    } & Section>;
    mysections(): Promise<Section[]>;
    withpaginatingsections(userId: any, offset?: number, limit?: number): Promise<Section[]>;
    allsections(userId: any): Promise<Section[]>;
    remove(id: number, userId: any): Promise<import("typeorm").DeleteResult>;
}
