import { CreateAcademicYearDto } from './dto/create-academic_year.dto';
import { UpdateAcademicYearDto } from './dto/update-academic_year.dto';
export declare class AcademicYearService {
    create(createAcademicYearDto: CreateAcademicYearDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateAcademicYearDto: UpdateAcademicYearDto): string;
    remove(id: number): string;
}
