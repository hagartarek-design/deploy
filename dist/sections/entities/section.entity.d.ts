import { CourseInfo } from "../../course_info/entities/course_info.entity";
import { Course } from "../../courses/entities/course.entity";
import { Student } from "../../students/entities/student.entity";
import { Lesson } from "../../teacher/lesson/entities/lesson.entity";
import { User } from "../../teacher/users/entities/user.entity";
import { Cart } from "../../cart/entities/cart.entity";
export declare class Section {
    id: number;
    lesson?: Lesson[];
    totalProgress: number;
    percent: number;
    overallProgress: number;
    amount: number;
    isUsed: boolean;
    name: string;
    cardimg: string;
    price: number;
    code: string;
    cart: Cart[];
    viewingWatching: number;
    course: Course;
    student: Student;
    course_info: CourseInfo;
    userId: User;
    description: string;
    students?: Student[];
}
