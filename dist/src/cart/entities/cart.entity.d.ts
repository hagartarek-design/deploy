import { Attachment } from "../../attachments/entities/attachment.entity";
import { Course } from "../../courses/entities/course.entity";
import { Section } from "../../sections/entities/section.entity";
import { Student } from "../../students/entities/student.entity";
import { Lesson } from "../../teacher/lesson/entities/lesson.entity";
export declare class Cart {
    id: number;
    student?: Student;
    attachment: Attachment;
    course: Course;
    section: Section;
    userId: number;
    lesson: Lesson;
}
