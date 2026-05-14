import { DailytableService } from './dailytable.service';
import { CreateDailytableDto } from './dto/create-dailytable.dto';
import { UpdateDailytableDto } from './dto/update-dailytable.dto';
export declare class DailytableController {
    private readonly dailytableService;
    constructor(dailytableService: DailytableService);
    create(createDailytableDto: CreateDailytableDto): string;
    findAll(coursetabledate?: Date): Promise<import("./entities/dailytable.entity").Dailytable>;
    findOne(id: string): string;
    update(id: string, updateDailytableDto: UpdateDailytableDto): string;
    remove(id: string): string;
}
