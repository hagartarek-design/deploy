import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
export declare class AssignmentsController {
    private readonly assignmentsService;
    constructor(assignmentsService: AssignmentsService);
    uploadcard(req: any, file: Express.Multer.File, CreateAssignmentDto: CreateAssignmentDto): Promise<{
        message: string;
        imagePath: string;
        assignment: import("./entities/assignment.entity").Assignment;
    }>;
    findAll(req: any): Promise<import("./entities/assignment.entity").Assignment[]>;
    withpaginatingsections(req: any, paginationDto?: UpdateAssignmentDto): Promise<import("./entities/assignment.entity").Assignment[]>;
    allassignments(req: any): Promise<import("./entities/assignment.entity").Assignment[]>;
    findOne(id: string): string;
    update(id: string, updateAssignmentDto: UpdateAssignmentDto): string;
    remove(id: string): string;
}
