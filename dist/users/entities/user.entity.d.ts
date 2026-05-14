import { Role } from "../../role/entities/role.entity";
import { Student } from "../../students/entities/student.entity";
import { User } from "../../teacher/users/entities/user.entity";
export declare class Users {
    id: number;
    name: string;
    email: string;
    password: string;
    provider: string;
    isActive: boolean;
    role: Role;
    teacher?: User;
    student?: Student;
    createdAt: Date;
    updatedAt: Date;
    roles: 'user' | 'student';
    refreshToken: string;
    token: string;
}
