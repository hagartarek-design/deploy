import { Course } from "../../courses/entities/course.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import {Student} from '../../students/entities/student.entity'
@Entity()
export class Studentquestion {

    @PrimaryGeneratedColumn()
    id:number;
    @Column({nullable:true,default:"1"})
    status:number
    @Column({nullable: true,default:"شحن محفظتك"})
    name:string
    @Column()
    text:string
    @CreateDateColumn()
      createdAt: Date;
    
      @UpdateDateColumn()
      updatedAt: Date;
      @ManyToOne(()=>Course,(course)=>course.student_id,{nullable:true})
      course:Course;
      @ManyToOne(()=>Student,(student)=>student.student_question ,)
         student:Student;
}
