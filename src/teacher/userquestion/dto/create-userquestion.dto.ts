import {  IsString } from "class-validator";

export class CreateUserquestionDto {
    @IsString()
    
 teacher_answer?:string

}

export class createanswerDto {
    @IsString()  
 teacher_answer?:string

}
