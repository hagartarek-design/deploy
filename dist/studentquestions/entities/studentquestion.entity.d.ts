import { Course } from "../../courses/entities/course.entity";
import { Student } from '../../students/entities/student.entity';
export declare class Studentquestion {
    id: number;
    status: number;
    name: string;
    text: string;
    createdAt: Date;
    updatedAt: Date;
    course: Course;
    student: Student;
}
