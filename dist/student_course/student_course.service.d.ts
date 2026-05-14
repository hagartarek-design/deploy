import { CreateStudentCourseDto } from './dto/create-student_course.dto';
import { UpdateStudentCourseDto } from './dto/update-student_course.dto';
import { Student } from 'src/students/entities/student.entity';
import { Repository } from 'typeorm';
import { Course } from './../courses/entities/course.entity';
import { StudentCourse } from './entities/student_course.entity';
import { CourseInfo } from 'src/course_info/entities/course_info.entity';
export declare class StudentCourseService {
    private readonly Coursesturepo;
    private readonly students;
    private readonly courseInfo;
    private readonly Courses;
    constructor(Coursesturepo: Repository<StudentCourse>, students: Repository<Student>, courseInfo: Repository<CourseInfo>, Courses: Repository<Course>);
    coursebystudent(id: number): Promise<{
        course: Course[];
    }>;
    courseinfo(id: number, course_id?: number): Promise<{
        course: Course[];
    }>;
    isEnrolled(studentId: number, courseId: number): Promise<boolean>;
    courseinfobyid(id: number, courseId: number): Promise<{
        course: CourseInfo[];
    }>;
    courseinfobyid2(id: number, infoid: number): Promise<CourseInfo[]>;
    findbyname(id: number, course_num: string): Promise<void>;
    studentcourse(id: number): Promise<{
        course: Student[];
        sumExamAss: number;
    }>;
    studentcourse2(id: number, name: string): Promise<{
        course: Course[];
    }>;
    create(createStudentCourseDto: CreateStudentCourseDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateStudentCourseDto: UpdateStudentCourseDto): string;
    remove(id: number): string;
}
