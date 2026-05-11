import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentquestionDto } from './create-studentquestion.dto';

export class UpdateStudentquestionDto extends PartialType(CreateStudentquestionDto) {}
