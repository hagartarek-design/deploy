import { Course } from "src/courses/entities/course.entity";
import { User } from "src/teacher/users/entities/user.entity";
export declare class CreateSectionDto {
    id: number;
    name: string;
    price: number;
    viewingWatching: number;
    userId: User;
    course: Course;
    description: string;
}
