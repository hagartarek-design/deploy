import { Lesson } from "../../teacher/lesson/entities/lesson.entity";
export declare class Content {
    id: number;
    lesson: Lesson[];
    title: string;
    duration: number;
    order: number;
}
