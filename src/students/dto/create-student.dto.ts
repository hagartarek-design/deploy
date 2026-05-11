import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsPositive, IsString, Min } from "class-validator";

export class CreateStudentDto {

    @IsOptional()
    @Type(() => Number) 
    @IsPositive()
    page?: number = 1; 
  
    @IsOptional()
    @Type(() => Number)
    @Min(1)
    limit?: number = 10; 

}

export class UpdateStudentDtoinfo {

password?:string
refreshToken?:string
stud_school:string

createdAt:Date
  isActive: boolean;
cityPlace:string
    name:string
    Location?:string
    buildingNum?:number
   homeNum?:number
   uniqueDescription?:string
    fullname?:string
    number? :number
    attendance?:boolean
    grade?:string
    provider:string
    sheets_paym?:boolean
    facebookLink:string
       
code?:string
Guardian_num?:string

parent_num?:string
percentage?:number
email:string


 phoneNum:string
 otp?:string
 customernum?:string
 img?:string
 branch:string
 father_phone_num :string
 mother_phone_num:string
parent1:string
parent2:string
coursetype:string
city:string
semester:string
center:string
role :string
picture:string

  

}

export class addAnswerDto{
    
    @IsString()  
    teacher_answer?:string
}
export class createstudDto {
fullname:string

name:string
email:string 
stud_school:string
grade:string
branch:string
mother_phone_num:string
father_phone_num:string
city:string
cityPlace:string
Location:string
buildingNum:number
homeNum:number
uniqueDescription:string
}
export class sendOtpDTO{
    @IsString()
    @IsNotEmpty()
    phoneNum:string
    @IsString()
    @IsNotEmpty()
    otp:string



}