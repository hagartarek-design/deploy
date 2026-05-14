import { Course } from "../../courses/entities/course.entity";
import { Dailytable } from "../../teacher/dailytable/entities/dailytable.entity";
import { Student } from "../../students/entities/student.entity";
import { Timestamp } from "typeorm";
import { Section } from "../../sections/entities/section.entity";
export declare class CourseInfo {
    id: number;
    fromdate: string;
    todate: string;
    section: Section[];
    course_num: string;
    course_center: string;
    name: string;
    created_date: Timestamp;
    Updated_date: Timestamp;
    question_date: Date;
    coursetabledate: Date;
    code: number;
    course_name: string;
    course: Course;
    students: Student;
    dailytable: Dailytable;
    originalName: string;
    mimetype: string;
    filename: string;
    path: string;
}
