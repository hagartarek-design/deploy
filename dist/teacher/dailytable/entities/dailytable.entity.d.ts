import { CourseInfo } from "../../../course_info/entities/course_info.entity";
import { Timestamp } from "typeorm";
export declare class Dailytable {
    id: number;
    created_date: Timestamp;
    Updated_date: Timestamp;
    course_info: CourseInfo[];
}
