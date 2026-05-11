import { CourseReservationService } from './course_reservation.service';
import { CreateCourseReservationDto } from './dto/create-course_reservation.dto';
import { UpdateCourseReservationDto } from './dto/update-course_reservation.dto';
export declare class CourseReservationController {
    private readonly courseReservationService;
    constructor(courseReservationService: CourseReservationService);
    getcoursereservation(): Promise<import("./entities/course_reservation.entity").CourseReservation[]>;
    create(createCourseReservationDto: CreateCourseReservationDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCourseReservationDto: UpdateCourseReservationDto): string;
    remove(id: string): string;
}
