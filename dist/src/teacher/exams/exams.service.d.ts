import { createExamDto, CreateExamDto } from './dto/create-exam.dto';
import { Exam } from './entities/exam.entity';
import { Repository } from 'typeorm';
import { User } from 'src/teacher/users/entities/user.entity';
export declare class ExamsService {
    private readonly userRepository;
    private readonly repository;
    constructor(userRepository: Repository<User>, repository: Repository<Exam>);
    create(createExamDto: CreateExamDto): Exam;
    uploadFile(id: number, file: Express.Multer.File, createExamDto: createExamDto): Promise<{
        message: string;
        imagePath: string;
        section: Exam;
    }>;
    exam_offline_online(online?: boolean, page?: number, limit?: number): Promise<{
        message: string;
        exam: Exam[];
        startdate: boolean[];
    }>;
    getpagination(page?: number, limit?: number): Promise<Exam[]>;
    getpaginationonline(page?: number, limit?: number): Promise<Exam[]>;
    searchExams(search: string): Promise<Exam[]>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
