import { CreateDailytableDto } from './dto/create-dailytable.dto';
import { UpdateDailytableDto } from './dto/update-dailytable.dto';
import { Dailytable } from './entities/dailytable.entity';
import { Repository } from 'typeorm';
export declare class DailytableService {
    private readonly Repository;
    constructor(Repository: Repository<Dailytable>);
    create(createDailytableDto: CreateDailytableDto): string;
    findAll(coursetabledate?: Date): Promise<Dailytable>;
    findOne(id: number): string;
    update(id: number, updateDailytableDto: UpdateDailytableDto): string;
    remove(id: number): string;
}
