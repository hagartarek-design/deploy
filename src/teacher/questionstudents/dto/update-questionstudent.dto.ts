import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionstudentDto } from './create-questionstudent.dto';

export class UpdateQuestionstudentDto extends PartialType(CreateQuestionstudentDto) {}
