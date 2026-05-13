import { CreateQuestionstudentDto } from './dto/create-questionstudent.dto';
import { UpdateQuestionstudentDto } from './dto/update-questionstudent.dto';
export declare class QuestionstudentsService {
    create(createQuestionstudentDto: CreateQuestionstudentDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateQuestionstudentDto: UpdateQuestionstudentDto): string;
    remove(id: number): string;
}
