import { Course } from "../../courses/entities/course.entity";
import { Student } from "../../students/entities/student.entity";
export declare class CourseReservation {
    id: number;
    place: string;
    start_date: Date;
    price: number;
    course: Course;
    students: Student;
}
