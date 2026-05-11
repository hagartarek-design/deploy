import { CreateCourseReservationDto } from './dto/create-course_reservation.dto';
import { UpdateCourseReservationDto } from './dto/update-course_reservation.dto';
import { CourseReservation } from './entities/course_reservation.entity';
import { Repository } from 'typeorm';
export declare class CourseReservationService {
    private readonly coursereservation;
    constructor(coursereservation: Repository<CourseReservation>);
    create(createCourseReservationDto: CreateCourseReservationDto): string;
    getcoursereservation(): Promise<CourseReservation[]>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCourseReservationDto: UpdateCourseReservationDto): string;
    remove(id: number): string;
}
