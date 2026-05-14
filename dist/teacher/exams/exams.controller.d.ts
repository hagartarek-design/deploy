import { ExamsService } from './exams.service';
import { createExamDto, CreateExamDto } from './dto/create-exam.dto';
export declare class ExamsController {
    private readonly examsService;
    constructor(examsService: ExamsService);
    create(createExamDto: CreateExamDto): import("./entities/exam.entity").Exam;
    exam_offline_online(online?: boolean, page?: number, limit?: number): Promise<{
        message: string;
        exam: import("./entities/exam.entity").Exam[];
        startdate: boolean[];
    }>;
    uploadcard(req: any, file: Express.Multer.File, createExamDto: createExamDto): Promise<{
        message: string;
        imagePath: string;
        section: import("./entities/exam.entity").Exam;
    }>;
    withpaginating(page?: number, limit?: number): Promise<import("./entities/exam.entity").Exam[]>;
    withpaginatingonline(page?: number, limit?: number): Promise<import("./entities/exam.entity").Exam[]>;
    search(search: string): Promise<import("./entities/exam.entity").Exam[]>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
