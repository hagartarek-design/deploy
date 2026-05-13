import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';
export declare class EventsService {
    private readonly event;
    constructor(event: Repository<Event>);
    create(createEventDto: CreateEventDto): string;
    findAll(): string;
    findOne(eventDate: Date): Promise<Event>;
    find(): Promise<Event[]>;
    update(id: number, updateEventDto: UpdateEventDto): string;
    remove(id: number): string;
}
