import { AcademicYearService } from './academic_year.service';
import { CreateAcademicYearDto } from './dto/create-academic_year.dto';
import { UpdateAcademicYearDto } from './dto/update-academic_year.dto';
export declare class AcademicYearController {
    private readonly academicYearService;
    constructor(academicYearService: AcademicYearService);
    create(createAcademicYearDto: CreateAcademicYearDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateAcademicYearDto: UpdateAcademicYearDto): string;
    remove(id: string): string;
}
