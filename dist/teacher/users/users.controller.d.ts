import { UsersService } from './users.service';
import { CreateSectionDto } from 'src/sections/dto/create-section.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    userInputInfo(req: any, email: string, fullname: string, phone: string): Promise<import("./entities/user.entity").User>;
    findAll(req: any): Promise<import("./entities/user.entity").User>;
    uploadFile(req: any, file: Express.Multer.File): Promise<any>;
    uploadcard(req: any, file: Express.Multer.File, createSectionDto: CreateSectionDto): Promise<{
        message: string;
        imagePath: string;
        section: import("../../sections/entities/section.entity").Section;
    }>;
    teacherGrades(): void;
    getLastUserImage(req: any): Promise<import("../images/entities/image.entity").Image>;
    getallimages(req: any): Promise<import("../images/entities/image.entity").Image[]>;
    getimagebyid(req: any, id: number): Promise<import("../images/entities/image.entity").Image>;
    deleteimage(req: any, id: number): Promise<import("typeorm").DeleteResult>;
    deleteOwnAccount(req: any): Promise<{
        message: string;
    }>;
    deleteAccount(id: number): Promise<{
        message: string;
    }>;
    restoreAccount(id: number): Promise<{
        message: string;
    }>;
    freezeAccount(req: any): Promise<{
        message: string;
    }>;
    unfreezeAccount(req: any): Promise<{
        message: string;
    }>;
}
