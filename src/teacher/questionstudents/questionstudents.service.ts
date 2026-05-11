import { Injectable } from '@nestjs/common';
import { CreateQuestionstudentDto } from './dto/create-questionstudent.dto';
import { UpdateQuestionstudentDto } from './dto/update-questionstudent.dto';

@Injectable()
export class QuestionstudentsService {
  create(createQuestionstudentDto: CreateQuestionstudentDto) {
    return 'This action adds a new questionstudent';
  }

  findAll() {
    return `This action returns all questionstudents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} questionstudent`;
  }

  update(id: number, updateQuestionstudentDto: UpdateQuestionstudentDto) {
    return `This action updates a #${id} questionstudent`;
  }

  remove(id: number) {
    return `This action removes a #${id} questionstudent`;
  }
}
