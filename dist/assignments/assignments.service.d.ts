import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { Assignment } from './entities/assignment.entity';
import { Repository } from 'typeorm';
import { User } from 'src/teacher/users/entities/user.entity';
export declare class AssignmentsService {
    private readonly Repository;
    private readonly userRepository;
    constructor(Repository: Repository<Assignment>, userRepository: Repository<User>);
    create(userId: any, createAssignmentDto: CreateAssignmentDto): Promise<Assignment>;
    withpaginatingsections(userId: any, offset?: number, limit?: number): Promise<Assignment[]>;
    uploadFile(id: number, file: Express.Multer.File, createassignmentDTO: CreateAssignmentDto): Promise<{
        message: string;
        imagePath: string;
        assignment: Assignment;
    }>;
    findAll(userId: any): Promise<Assignment[]>;
    allassignments(userId: any): Promise<Assignment[]>;
    findOne(id: number): string;
    update(id: number, updateAssignmentDto: UpdateAssignmentDto): string;
    remove(id: number): string;
}
