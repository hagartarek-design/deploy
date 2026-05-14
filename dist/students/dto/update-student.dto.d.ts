import { CreateStudentDto } from './create-student.dto';
import { CourseReservation } from 'src/course_reservation/entities/course_reservation.entity';
import { CourseInfo } from 'src/course_info/entities/course_info.entity';
import { Course } from 'src/courses/entities/course.entity';
declare const UpdateStudentDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateStudentDto>>;
export declare class UpdateStudentDto extends UpdateStudentDto_base {
    name?: string;
    number?: number;
    attendance?: boolean;
    grade?: string;
    sheets_paym?: boolean;
    courses?: Course[];
    code?: string;
    Guardian_num?: string;
    parent_num?: string;
    percentage?: number;
    email?: string;
    course_info?: CourseInfo;
    coursereserve?: CourseReservation[];
    phoneNum?: string;
    customernum?: string;
    img?: string;
}
export {};
