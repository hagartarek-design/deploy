import { User } from "../../teacher/users/entities/user.entity";
export declare class Role {
    id: number;
    module_name: string;
    endpoint: string;
    name: string;
    method: string;
    can_teacher: boolean;
    query: string;
    can_student: boolean;
    users: User[];
    user: User[];
}
