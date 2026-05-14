import { User } from '../../users/entities/user.entity';
import { Student } from '../../../students/entities/student.entity';
import { Exam } from '../../../teacher/exams/entities/exam.entity';
export declare class Image {
    id: number;
    url?: string;
    user?: User;
    student?: Student;
    exam?: Exam;
    examimg?: string;
}
