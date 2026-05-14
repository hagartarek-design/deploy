import { CreateCourseAttendDto } from './dto/create-course_attend.dto';
import { UpdateCourseAttendDto } from './dto/update-course_attend.dto';
import { CourseAttend } from './entities/course_attend.entity';
import { Repository } from 'typeorm';
export declare class CourseAttendService {
    private readonly Repository;
    constructor(Repository: Repository<CourseAttend>);
    create(createCourseAttendDto: CreateCourseAttendDto): string;
    findAll(): string;
    withpaginating(offset: number, limit: number): Promise<CourseAttend[]>;
    withoutpaginating(): Promise<CourseAttend[]>;
    findOne(id: number): string;
    update(id: number, updateCourseAttendDto: UpdateCourseAttendDto): string;
}
