import { Assignment } from "../../../assignments/entities/assignment.entity";
import { Lesson } from "../../../teacher/lesson/entities/lesson.entity";
import { Student } from "../../../students/entities/student.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {Exam}from '../../../teacher/exams/entities/exam.entity';
@Entity()
export class Userquestion {

@PrimaryGeneratedColumn()
id:number
@Column()
name:string
// @Column()
// name:string
@Column({default:false})
solved:boolean
 @ManyToOne(() => Lesson, (lesson) => lesson.questions, {})
lesson: Lesson;
@ManyToOne(()=>Exam,(exam)=>exam.questions,{nullable:true})
exam:Exam;
 @ManyToOne(() => Assignment, (assignments) => assignments.questions, {})
assignments: Assignment;
@OneToMany(()=>Student,(students)=>students.questions,{})
students:Student[]
@Column({nullable:true})
month_by_year:string
@OneToMany(()=>Lesson,(lessons)=>lessons.userquestions,{})
lessons:Lesson
@Column()
type_ques:string
@Column()
teacher_answer:string
@Column({nullable:true})
student_answer:string
@Column({default:false})
trueAnswer:boolean
@Column({default:false})
trueAnswerExam:boolean
@Column({nullable:true})
studentAnswerExam:string
@Column({ type: 'json', nullable: true })
  chooses: string[];
// @Column({nullable:true})
// chooses:string[]

}
