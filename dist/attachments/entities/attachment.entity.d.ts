import { Assignment } from '../../assignments/entities/assignment.entity';
import { Exam } from "../../teacher/exams/entities/exam.entity";
import { Cart } from "../../cart/entities/cart.entity";
import { Student } from "../../students/entities/student.entity";
export declare class Attachment {
    id: number;
    cycle: string;
    price: number;
    countassign: number;
    code: string;
    isUsed: boolean;
    amount: number;
    assignments?: Assignment[];
    exam?: Exam[];
    student?: Student;
    cart?: Cart[];
    status?: string;
    createdAt: Date;
}
