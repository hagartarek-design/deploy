import { CourseAttendService } from './course_attend.service';
import { CreateCourseAttendDto } from './dto/create-course_attend.dto';
import { UpdateCourseAttendDto } from './dto/update-course_attend.dto';
export declare class CourseAttendController {
    private readonly courseAttendService;
    constructor(courseAttendService: CourseAttendService);
    create(createCourseAttendDto: CreateCourseAttendDto): string;
    withpaginating(paginationDto: CreateCourseAttendDto): Promise<import("./entities/course_attend.entity").CourseAttend[]>;
    withoutpaginating(): Promise<import("./entities/course_attend.entity").CourseAttend[]>;
    update(id: string, updateCourseAttendDto: UpdateCourseAttendDto): string;
}
