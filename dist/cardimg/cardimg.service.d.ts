import { CreateCardimgDto } from './dto/create-cardimg.dto';
import { UpdateCardimgDto } from './dto/update-cardimg.dto';
export declare class CardimgService {
    create(createCardimgDto: CreateCardimgDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCardimgDto: UpdateCardimgDto): string;
    remove(id: number): string;
}
