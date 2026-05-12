import { CourseInfo } from "../../course_info/entities/course_info.entity";
import { CourseReservation } from "../../course_reservation/entities/course_reservation.entity";
import { Course } from "../../courses/entities/course.entity";
import { Exam } from "../../teacher/exams/entities/exam.entity";
import { Image } from "../../teacher/images/entities/image.entity";
import { Section } from "../../sections/entities/section.entity";
import { Userquestion } from "../../teacher/userquestion/entities/userquestion.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
// import { IsNotEmpty } from "class-validator";
import { StudentCourse } from "../../student_course/entities/student_course.entity";
import { Lesson } from "../../teacher/lesson/entities/lesson.entity";
import { Code } from "../../code/entities/code.entity";
import { Attachment } from "../../attachments/entities/attachment.entity";
import { Studentquestion } from "../../studentquestions/entities/studentquestion.entity";
// import { Role } from "../../role/entities/role.entity";
import {Users}from '../../users/entities/user.entity';
@Entity('student')
export class Student {
@PrimaryGeneratedColumn()
id:number

@OneToOne(() => Users, users => users.student)
users: Users;

  @Column('simple-array', { nullable: true })
  usedCards: string[];
  @Column({default:false})
  isUsed:boolean
 @ManyToMany(() => Code, (card) => card.students, { cascade: true })
  @JoinTable()
  rechargeCards: Code[];
// @Column()
// email:string
@Column({nullable:true})
password?:string
@Column({nullable:true})
refreshToken?:string
@Column({nullable:true})
stud_school:string
@Column({nullable:true})

createdAt:Date
  @Column({ default: true ,nullable:true})
  isActive: boolean;
@Column({nullable:true})
cityPlace:string
@Column()
    name:string
@Column({nullable:true})
    Location?:string
@Column({nullable:true})
    buildingNum?:number
@Column({nullable:true})
   homeNum?:number
@Column({nullable:true})
   uniqueDescription?:string

    @Column({nullable:true})
    fullname?:string
    @Column({nullable:true})
    number? :number
    @Column({nullable:true})
    attendance?:boolean
    @Column({nullable:true})
    grade?:string
    @Column({nullable:true})
    provider:string
    @Column({nullable :true})
    sheets_paym?:boolean
    @OneToMany(()=>StudentCourse,(student_course)=>student_course.student)
    student_course:StudentCourse[];
    @OneToMany(()=>Lesson,(lesson)=>lesson.student)
    lesson:Lesson[];
    // @ManyToOne(()=>Lesson,(lesson)=>lesson.students)
    // lessons:Lesson[];
    // @OneToMany(()=>Lesson,(lesson)=>lesson.student)
    // lesson:Lesson;
    @Column({nullable :true})
    facebookLink:string
    @ManyToMany(
        () => Course, 
        course => course.students,
        {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'})
        @JoinTable({
          name: 'student_course',
          joinColumn: {
            name: 'student_id',
            referencedColumnName: 'id',
          },
          inverseJoinColumn: {
            name: 'course_id',
            referencedColumnName: 'id',
          },
        })
        courses?: Course[];
    // @ManyToMany(
    //     () => Section, 
    //     section => section.students,
    //     {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'})
    //     @JoinTable({
    //       name: 'student_section',
    //       joinColumn: {
    //         name: 'student_id',
    //         referencedColumnName: 'id',
    //       },
    //       inverseJoinColumn: {
    //         name: 'section_id',
    //         referencedColumnName: 'id',
    //       },
    //     })
    //     sections?: Section[];
      @Column({unique:true,nullable:true})
code?:string

@Column({nullable:true})
Guardian_num?:string

@Column({nullable:true})
parent_num?:string
@Column({nullable:true})
percentage?:number
@Column()
email:string
@OneToMany(()=>CourseInfo,(course)=>course.students)
course_info?:CourseInfo
@OneToMany(()=>Section,(section)=>section.student)
sections?:Section[]
@OneToMany(()=>Attachment,(attachment)=>attachment.student)
attachments?:Attachment[]
 @ManyToOne(() => CourseReservation, (courses) => courses.students, {})
 coursereserve?: CourseReservation[];
 @ManyToOne(() => Course, (course) => course.student, {})
 course?: Course[];
 @OneToMany(() => Exam, (exam) => exam.student, {})
 exam?: Exam[];
 @ManyToOne(() => Userquestion, (userquestion) => userquestion.students, {})
 questions?: Userquestion;
 @OneToMany(() => Course, (courses_id) => courses_id.student_id, {})
 courses_id?: Course[];
 @Column({nullable :true})
 phoneNum:string
 @Column({nullable:true})
 otp?:string
 @Column ({nullable:true})
 customernum?:string
 @Column({nullable:true})
 img?:string
 @Column({nullable:true})
 branch:string
 @Column({nullable:true})
 father_phone_num :string
 @Column({nullable:true})
 mother_phone_num:string
 @Column({nullable:true})
parent1:string
@Column({nullable:true})
parent2:string
@Column({nullable:true})
coursetype:string
@OneToMany(() => Image, (image) => image.student, { cascade: true })
images: Image[];
@OneToMany(() => Studentquestion, (studentques) => studentques.student, { cascade: true })
student_question: Studentquestion[];
@Column({nullable:true})
city:string
@Column({nullable:true})
semester:string
@Column({nullable:true})
center:string
// @Column({nullable:true})
// role :string
@Column({nullable:true})
picture:string
 @Column({ default: 0 })
  walletBalance: number;
@Column({nullable:true})
address:string


   @Column({  default: 0 })
  balance: number;

  @OneToMany(() => Course, (tx) => tx.student_id)
  student_id: Course[];
  // @ManyToOne(()=>Role,role=>role.student,)
  // @JoinColumn({name:'role_id'})
  // role:Role


  @OneToOne(()=>Users,user=>user.student,{onDelete:"CASCADE"})
  user:Users
}

