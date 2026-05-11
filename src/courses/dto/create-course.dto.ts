import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";
export class RechargeDto {
  @IsString()
  @IsNotEmpty()
  code: string;
}
export class CreateRechargeCardDto {
    @IsNumber()
  @Min(1)
  amount: number;
}
export class CreateCourseDto {


      @IsOptional()
      @Type(() => Number) 
      @IsPositive()
      page?: number = 1; 
    
      @IsOptional()
      @Type(() => Number)
      @Min(1)
      limit?: number = 10;
}
