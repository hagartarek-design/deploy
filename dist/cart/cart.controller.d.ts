import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Repository } from 'typeorm';
import { Course } from 'src/courses/entities/course.entity';
export declare class CartController {
    private readonly cartService;
    private readonly coursesrepo;
    constructor(cartService: CartService, coursesrepo: Repository<Course>);
    completeCoursePurchase(body: {
        courseId: number;
    }): Promise<{
        message: string;
        remainingAmount: number;
        status: string;
    }>;
    createRecharge(body: {
        userId: string;
        amount: number;
        mobile?: string;
    }): Promise<{
        merchantRef: string;
        fawry: any;
    }>;
    payCart(body: {
        courseId: number;
        mobile: string;
    }): Promise<{
        course: Course;
        fawry: any;
    }>;
    create(createCartDto: CreateCartDto): string;
    findAll(): Promise<{
        data: {
            course: Course;
            attachment: import("../attachments/entities/attachment.entity").Attachment;
            section: import("../sections/entities/section.entity").Section;
            lesson: import("../teacher/lesson/entities/lesson.entity").Lesson;
            id: number;
            student?: import("../students/entities/student.entity").Student;
            userId: number;
        }[];
        length: number;
    }>;
    attachfromcart(id: number): Promise<import("@nestjs/common").ConflictException | import("typeorm").DeleteResult>;
    findOne(id: string): string;
    update(id: string, updateCartDto: UpdateCartDto): string;
    remove(id: string): string;
}
