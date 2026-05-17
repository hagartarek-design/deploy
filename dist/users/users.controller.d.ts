import { UsersService } from './users.service';
import { CreateUserDto, GoogleLoginDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
export declare class UsersController {
    private readonly usersService;
    private readonly user;
    constructor(usersService: UsersService, user: Repository<Users>);
    create(createUserDto: CreateUserDto): string;
    googleLogin(body: GoogleLoginDto): Promise<{
        success: boolean;
        token: string;
        refreshtoken: string;
        userId: number;
        teacherId: number;
    }>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
}
