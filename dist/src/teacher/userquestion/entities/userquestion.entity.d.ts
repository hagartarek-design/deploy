import { Assignment } from "../../../assignments/entities/assignment.entity";
import { Lesson } from "../../../teacher/lesson/entities/lesson.entity";
import { Student } from "../../../students/entities/student.entity";
import { Exam } from '../../../teacher/exams/entities/exam.entity';
export declare class Userquestion {
    id: number;
    name: string;
    solved: boolean;
    lesson: Lesson;
    exam: Exam;
    assignments: Assignment;
    students: Student[];
    month_by_year: string;
    lessons: Lesson;
    type_ques: string;
    teacher_answer: string;
    student_answer: string;
    trueAnswer: boolean;
    trueAnswerExam: boolean;
    studentAnswerExam: string;
    chooses: string[];
}
