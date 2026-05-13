import { Attachment } from "../../attachments/entities/attachment.entity";
import { Course } from "../../courses/entities/course.entity";
import { Userquestion } from "../../teacher/userquestion/entities/userquestion.entity";
import { User } from "../../teacher/users/entities/user.entity";
import { Timestamp } from "typeorm";
export declare class Assignment {
    id: number;
    name: string;
    questions?: Userquestion;
    degree: number;
    lastdate: Date;
    startdate: Date;
    price: number;
    userId: User;
    course: Course;
    attachment: Attachment;
    assigcardimg: string;
    created_date: Timestamp;
    Updated_date: Timestamp;
}
