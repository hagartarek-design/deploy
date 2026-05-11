import { PartialType } from '@nestjs/mapped-types';
import { CreateCardimgDto } from './create-cardimg.dto';

export class UpdateCardimgDto extends PartialType(CreateCardimgDto) {}
