import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Image } from 'src/teacher/images/entities/image.entity';
import { Section } from 'src/sections/entities/section.entity';
import { CreateSectionDto } from 'src/sections/dto/create-section.dto';
import { Course } from 'src/courses/entities/course.entity';
export declare class UsersService {
    private readonly user;
    private readonly imageRepository;
    private readonly sectionRepository;
    private readonly courseRepository;
    constructor(user: Repository<User>, imageRepository: Repository<Image>, sectionRepository: Repository<Section>, courseRepository: Repository<Course>);
    getallimages(userId: number): Promise<Image[]>;
    deleteimage(userId: number, id: number): Promise<import("typeorm").DeleteResult>;
    getimagebyid(userId: number, id: number): Promise<Image>;
    getLastImage(userId: number): Promise<Image>;
    handleFileUpload(id: number, file: Express.Multer.File): Promise<any>;
    uploadFile(id: number, file: Express.Multer.File, createSectionDto: CreateSectionDto): Promise<{
        message: string;
        imagePath: string;
        section: Section;
    }>;
    findAll(id: number): Promise<User>;
    deleteUser(id: number): Promise<void>;
    deleteUserByAuth(userId: number, loggedInUserId: number): Promise<void>;
    softDeleteUser(id: number): Promise<void>;
    deleteAccount(userId: number): Promise<void>;
    restoreAccount(userId: number): Promise<void>;
    freezeAccount(userId: number): Promise<void>;
    unfreezeAccount(userId: number): Promise<void>;
    userInputInfo(userId: number, newEmail: string, fullname: string, phone: string): Promise<User>;
}
