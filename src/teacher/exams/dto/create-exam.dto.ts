import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateExamDto {  
  // @Type(() => Number) 
  @IsOptional()
  page?: number = 1; 

  @IsOptional()
  // @Type(() => Number)
 
  limit?: number = 10; 
}

export class  createExamDto{
  @IsString()
  exam_name:string
  @IsNumber ()
  examprice:number
  @IsNumber()
  trials_number:number
  @IsString()
  durationmin:string
  @IsString()
  totaldegree:string
@IsString()
degree_success:string
// @IsBoolean()
showdegreeEveryQues:number
// @IsBoolean()

showDegreeafter:number
startdate:Date
seedate:Date
}