import { Course } from "../../courses/entities/course.entity";
import { Student } from "../../students/entities/student.entity";
export declare class StudentCourse {
    student_id: number;
    course_id: number;
    student: Student;
    course: Course;
}
