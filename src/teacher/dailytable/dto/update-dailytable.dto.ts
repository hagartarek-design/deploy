import { PartialType } from '@nestjs/mapped-types';
import { CreateDailytableDto } from './create-dailytable.dto';

export class UpdateDailytableDto extends PartialType(CreateDailytableDto) {}
