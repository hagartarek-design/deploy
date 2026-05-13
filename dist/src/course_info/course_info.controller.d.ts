import { CourseInfoService } from './course_info.service';
import { CreateCourseInfoDto } from './dto/create-course_info.dto';
import { Response } from 'express';
export declare class CourseInfoController {
    private readonly courseInfoService;
    constructor(courseInfoService: CourseInfoService);
    deletecourse_attend(id: string): Promise<import("typeorm").DeleteResult | {
        success: boolean;
        message: any;
    }>;
    findmany(): Promise<import("./entities/course_info.entity").CourseInfo[]>;
    getall(): Promise<import("./entities/course_info.entity").CourseInfo[]> | {
        success: boolean;
        message: any;
    };
    dropdown(id: string): Promise<import("../courses/entities/course.entity").Course | {
        success: boolean;
        message: any;
    }>;
    uploadVideo(file: Express.Multer.File, id: number): Promise<import("@nestjs/common").ConflictException | import("typeorm").UpdateResult>;
    streamVideo(id: string, res: Response): Promise<void | Response<any, Record<string, any>>>;
    withpagination(paginationDto: CreateCourseInfoDto): Promise<import("./entities/course_info.entity").CourseInfo[]>;
}
