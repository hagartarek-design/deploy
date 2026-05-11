import { PartialType } from '@nestjs/mapped-types';
import { CreateAssignmentDto } from './create-assignment.dto';
import { IsOptional, IsPositive, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateAssignmentDto extends PartialType(CreateAssignmentDto) {


 
        
      @IsOptional
      ()
      @Type(() => Number) // Ensures type conversion from string to number
      @IsPositive()
      page?: number = 1; // Default to the first page
    
      @IsOptional()
      @Type(() => Number)
      @Min(1)
      limit?: number = 10;
    
}
