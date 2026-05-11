import { Course } from "../../courses/entities/course.entity";
import { Dailytable } from "../../teacher/dailytable/entities/dailytable.entity";
import { Student } from "../../students/entities/student.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { Section } from "../../sections/entities/section.entity";
@Entity()
export class CourseInfo {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    fromdate:string
    @Column()
    todate:string
        @OneToMany(()=>Section,(section)=>section.course_info)
       section:Section[]
    @Column()
    course_num:string
    @Column()
    course_center:string
    @Column()
    name:string
          @CreateDateColumn()
          created_date:Timestamp
          @UpdateDateColumn()
          Updated_date:Timestamp
@Column({default:"2025-01-05 09:40:58.267985"})
question_date:Date

@Column({ type: 'date',default:'2025-01-05' })

coursetabledate:Date
@Column()
code:number
 @Column()
    course_name:string
    
    @ManyToOne(() => Course, (courses) => courses.course_info, {})
    course: Course;
    
  @ManyToOne(
      () => Student,
      (productCharacteristic) => productCharacteristic.course_info,
    
    )
    students:Student
    
    
  @ManyToOne(
      () => Dailytable,
      (dailytable) => dailytable.course_info,
    
    )
    dailytable:Dailytable
 @Column()
  originalName: string;

  @Column()
  mimetype: string;
  @Column()
  filename: string;

  @Column()
  path: string;
}
