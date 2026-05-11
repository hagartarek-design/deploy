import { StudentCourseService } from './student_course.service';
import { CreateStudentCourseDto } from './dto/create-student_course.dto';
import { UpdateStudentCourseDto } from './dto/update-student_course.dto';
import { Request } from 'express';
export declare class StudentCourseController {
    private readonly studentCourseService;
    constructor(studentCourseService: StudentCourseService);
    create(createStudentCourseDto: CreateStudentCourseDto): string;
    studentcourse(req: Request): Promise<{
        course: import("../students/entities/student.entity").Student[];
        sumExamAss: number;
    }>;
    studentcourse2(req: Request, name: string): Promise<{
        course: import("../courses/entities/course.entity").Course[];
    }>;
    coursebystudent(req: Request): Promise<{
        course: import("../courses/entities/course.entity").Course[];
    }>;
    courseinfo(req: Request, course_id?: number): Promise<{
        course: import("../courses/entities/course.entity").Course[];
    }>;
    courseinfobyid(req: Request, courseId: number): Promise<{
        course: import("../course_info/entities/course_info.entity").CourseInfo[];
    }>;
    isEnrolled(req: Request, courseId: number): Promise<{
        enrolled: boolean;
    }>;
    courseinfobyid2(req: Request, infoid: number): Promise<import("../course_info/entities/course_info.entity").CourseInfo[]>;
    findOne(id: string): string;
    update(id: string, updateStudentCourseDto: UpdateStudentCourseDto): string;
    remove(id: string): string;
}
