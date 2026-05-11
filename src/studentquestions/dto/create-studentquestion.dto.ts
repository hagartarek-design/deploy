import { IsString } from "class-validator";

export class CreateStudentquestionDto {

    @IsString()
     text:string
}
