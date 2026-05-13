import { Userquestion } from "src/teacher/userquestion/entities/userquestion.entity";
export declare class CreateAssignmentDto {
    name: string;
    questions?: Userquestion;
    degree: number;
    lastdate: string;
    startdate: string;
    price: number;
    assigcardimg: string;
}
