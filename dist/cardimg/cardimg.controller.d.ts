import { CardimgService } from './cardimg.service';
import { CreateCardimgDto } from './dto/create-cardimg.dto';
import { UpdateCardimgDto } from './dto/update-cardimg.dto';
export declare class CardimgController {
    private readonly cardimgService;
    constructor(cardimgService: CardimgService);
    create(createCardimgDto: CreateCardimgDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCardimgDto: UpdateCardimgDto): string;
    remove(id: string): string;
}
