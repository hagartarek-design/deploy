import { Attachment } from "../../attachments/entities/attachment.entity";
import { Course } from "../../courses/entities/course.entity";
import { Section } from "../../sections/entities/section.entity";
import { Student } from "../../students/entities/student.entity";
import { Lesson } from "../../teacher/lesson/entities/lesson.entity";

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()


export class Cart {
@PrimaryGeneratedColumn()
id:number
@ManyToOne(()=>Student,(student)=>student.attachments)
student?:Student  
// @Column()
  @ManyToOne(() => Attachment, (attachment) => attachment.cart)
  attachment: Attachment;
  @ManyToOne(() => Course, (course) => course.cart)
  course: Course;
  @ManyToOne(() => Section, (section) => section.cart)
  section: Section;
//   @ManyToOne(() => , (attachment) => attachment.cart)
//   attachment: ;
@Column({nullable :true})
userId:number;
@ManyToOne(()=>Lesson,(lesson)=>lesson.cart)
lesson:Lesson
}









