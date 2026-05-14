import { StudentquestionsService } from './studentquestions.service';
import { CreateStudentquestionDto } from './dto/create-studentquestion.dto';
import { UpdateStudentquestionDto } from './dto/update-studentquestion.dto';
import { Request } from 'express';
export declare class StudentquestionsController {
    private readonly studentquestionsService;
    constructor(studentquestionsService: StudentquestionsService);
    create(createStudentquestionDto: CreateStudentquestionDto, req: Request, name: string): Promise<import("./entities/studentquestion.entity").Studentquestion | import("@nestjs/common").NotFoundException>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateStudentquestionDto: UpdateStudentquestionDto): string;
    remove(id: string): string;
}
