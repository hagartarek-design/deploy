import { Attachment } from "../../attachments/entities/attachment.entity";
import { Course } from "../../courses/entities/course.entity";
import { Userquestion } from "../../teacher/userquestion/entities/userquestion.entity";
import { User } from "../../teacher/users/entities/user.entity";

import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity()
export class Assignment {
@PrimaryGeneratedColumn()
id:number;
@Column()
name:string
@OneToMany(()=>Userquestion,(questions)=>questions.assignments)
questions?:Userquestion
@Column()
degree:number
@Column()
@Column({ type: 'date',default:'2025-01-05' })
lastdate:Date
@Column({ type: 'date',default:'2025-01-05' })
startdate:Date


@Column()
price:number
  @ManyToOne(() => User, (user) => user.assignment, { onDelete: 'CASCADE' })
  userId: User;
  @ManyToOne(() => Course, (course) => course.assignment, { onDelete: 'CASCADE' })
  course: Course;
  @ManyToOne(() => Attachment , (attachment) => attachment.assignments, { onDelete: 'CASCADE' })
  attachment: Attachment;
  @Column()
  assigcardimg:string
      @CreateDateColumn()
      created_date:Timestamp
      @UpdateDateColumn()
      Updated_date:Timestamp
}
