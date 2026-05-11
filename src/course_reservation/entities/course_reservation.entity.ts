import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm";

import { Course } from "../../courses/entities/course.entity";
import { Student } from "../../students/entities/student.entity";

@Entity()
export class CourseReservation {
@PrimaryGeneratedColumn()
id:number
@Column()
place:string
@Column()
start_date:Date
@Column()
price:number

 @ManyToOne(() => Course, (courses) => courses.coursereservation, {})
course: Course;
   @ManyToOne(
      () => Student,
      (productCharacteristic) => productCharacteristic.coursereserve,
    
    )
      
        students:Student

}