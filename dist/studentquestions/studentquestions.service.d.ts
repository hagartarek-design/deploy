import { NotFoundException } from '@nestjs/common';
import { CreateStudentquestionDto } from './dto/create-studentquestion.dto';
import { UpdateStudentquestionDto } from './dto/update-studentquestion.dto';
import { Repository } from 'typeorm';
import { Studentquestion } from './entities/studentquestion.entity';
import { Course } from 'src/courses/entities/course.entity';
export declare class StudentquestionsService {
    private readonly repository;
    private readonly courseRepo;
    constructor(repository: Repository<Studentquestion>, courseRepo: Repository<Course>);
    create(createStudentquestionDto: CreateStudentquestionDto, id: number, name: string): Promise<Studentquestion | NotFoundException>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateStudentquestionDto: UpdateStudentquestionDto): string;
    remove(id: number): string;
}
