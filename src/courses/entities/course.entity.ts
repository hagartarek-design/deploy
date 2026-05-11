import { Student } from "../../students/entities/student.entity";
import { Event } from "../../teacher/events/entities/event.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { CourseAttend } from "../../course_attend/entities/course_attend.entity";
import { Exam } from "../../teacher/exams/entities/exam.entity";
import { CourseInfo } from "../../course_info/entities/course_info.entity";
import { CourseReservation } from "../../course_reservation/entities/course_reservation.entity";
import { Section } from "../../sections/entities/section.entity";
import { Optional } from "@nestjs/common";
import { Assignment } from "../../assignments/entities/assignment.entity";
import { StudentCourse } from "../../student_course/entities/student_course.entity";
import { User } from "../../teacher/users/entities/user.entity";
import { Studentquestion } from "../../studentquestions/entities/studentquestion.entity";
import { Cart } from "../../cart/entities/cart.entity";
@Entity()
export class Course {
@PrimaryGeneratedColumn()
    id:number
  @Column({default:10})
  amount: number;
@Column({nullable:true})
merchantRef:string;
@Column({nullable:true})
status:string;
  @Column({ default: false })
  isUsed: boolean;
    @Column({nullable:true})
    Video:string
    @OneToMany(() => StudentCourse, (studentCourse) => studentCourse.student)
studentCourses: StudentCourse[];
    @OneToMany(() => Studentquestion, (studentquestions) => studentquestions.course)
studentquestions: Studentquestion[];
@OneToMany(()=>Cart,(cart)=>cart.course)
cart:Cart[]
    @Column({nullable:true})

@Optional
()
    name :string
    @Column({nullable:true})
    description:string
    @Column({nullable :true})
    attendance:boolean
    @Column({nullable :true})
    grade:string
    @Column({nullable :true})
    type:string
    @Column(




      {nullable :true}
    )
    sheets_paym:boolean
    @CreateDateColumn({nullable: true})
    created_date:Timestamp
    @UpdateDateColumn({nullable:true})
    Updated_date:Timestamp
   @Column({ nullable: true })
month_by_year?: string;

    @OneToMany(
      () => Event,
      (productCharacteristic) => productCharacteristic.course,
    
    )
    
    event:Event[]
    @OneToMany(
      () => CourseReservation,
      (productCharacteristic) => productCharacteristic.course,
    
    )
    
    coursereservation:CourseReservation[]

    @OneToMany(
      () => Exam,
      (productCharacteristic) => productCharacteristic.course,
    
    )
    exam:Exam[]
    @OneToMany(
      () => Assignment,
      (assignment) => assignment.course,
    
    )
    assignment:Assignment[]

    @OneToMany(
      () => CourseAttend,
      (courseattend) => courseattend.course,
    
    )
course_attend:CourseAttend[]
@OneToMany(() => Student, student => student.course)
student: Student[];

    @ManyToMany(
        () => Student,
        student => student.courses,
        {onDelete: 'NO ACTION', onUpdate: 'NO ACTION',},
      )
      students?: User[];
    @ManyToMany(
        () => User,
        user => user.courses,
        {onDelete: 'NO ACTION', onUpdate: 'NO ACTION',},
      )
      users?: User[];
    @OneToMany(()=>CourseInfo,(course_info)=>course_info.course)
   course_info:CourseInfo[]
    @OneToMany(()=>Section,(section)=>section.course)
   section:Section[]

@Column ({nullable:true})
availableStudents:number
@Column ({nullable:true})
placecountry:string
  @Column({nullable:true})
  originalName: string;

@Column({nullable:true})
  filename: string;
  @Column({nullable:true})
  filename2: string;

@Column({nullable:true})
originalName2:string
  @Column({nullable:true})
  mimetype: string;


  @Column({nullable:true})
  path: string;
@ManyToOne(() => Student, (student) => student.courses_id, {})
  student_id: Student;

  @Column({ nullable:true })
  code: string;
@Column({default:0})
price:number
@Column({nullable:true})
fawryRefNumber:string
// @Column({nulla})
// fawrypaym :string
// @Column()

@Column({nullable:true})
viewedCount:number
@Column({nullable:true})
percentage:number
}
