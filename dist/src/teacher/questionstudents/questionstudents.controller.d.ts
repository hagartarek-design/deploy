import { QuestionstudentsService } from './questionstudents.service';
import { CreateQuestionstudentDto } from './dto/create-questionstudent.dto';
import { UpdateQuestionstudentDto } from './dto/update-questionstudent.dto';
export declare class QuestionstudentsController {
    private readonly questionstudentsService;
    constructor(questionstudentsService: QuestionstudentsService);
    create(createQuestionstudentDto: CreateQuestionstudentDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateQuestionstudentDto: UpdateQuestionstudentDto): string;
    remove(id: string): string;
}
