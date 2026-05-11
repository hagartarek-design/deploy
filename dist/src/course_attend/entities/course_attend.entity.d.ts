import { Course } from "../../courses/entities/course.entity";
export declare class CourseAttend {
    id: number;
    month: string;
    days: string;
    seen_amount: number;
    pay_amount: number;
    course: Course;
}
