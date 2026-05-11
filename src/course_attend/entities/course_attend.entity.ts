import { Course } from "../../courses/entities/course.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class CourseAttend {
@PrimaryGeneratedColumn()
id:number
 @Column()
 month:string
 @Column()
 days:string

 @Column()
 seen_amount:number
 @Column()
 pay_amount:number
 @ManyToOne(() => Course, (courses) => courses.course_attend, {})
course: Course;
 
}
