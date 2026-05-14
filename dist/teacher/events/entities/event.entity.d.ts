import { Course } from "../../../courses/entities/course.entity";
import { Timestamp } from "typeorm";
export declare class Event {
    id: number;
    title: string;
    description: string;
    eventDate: Date;
    createddate: Timestamp;
    updateddate: Timestamp;
    course: Course;
}
