import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as admin from 'firebase-admin';
import { Role } from '../role/entities/role.entity';
import { Users } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto, GoogleLoginDto } from './dto/create-user.dto';
import { User } from '../teacher/users/entities/user.entity';
export declare class UsersService {
    private readonly users;
    private readonly user;
    private jwtService;
    private readonly firebaseAdmin;
    private readonly roleRepository;
    constructor(users: Repository<Users>, user: Repository<User>, jwtService: JwtService, firebaseAdmin: typeof admin, roleRepository: Repository<Role>);
    create(createUserDto: CreateUserDto): string;
    verifyGoogleToken(idToken: string): Promise<{
        email: string;
        name: any;
        uid: string;
    }>;
    googleLogin(dto: GoogleLoginDto): Promise<{
        success: boolean;
        token: string;
        refreshtoken: string;
        userId: number;
        teacherId: number;
    }>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
