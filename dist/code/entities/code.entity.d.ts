import { Student } from "../../students/entities/student.entity";
import { Timestamp } from "typeorm";
export declare class Code {
    id: string;
    rechargeCode: string;
    serial: string;
    amount: number;
    balance: number;
    isRecharged: boolean;
    isUsed: boolean;
    students: Student[];
    createddate: Timestamp;
    updateddate: Timestamp;
}
