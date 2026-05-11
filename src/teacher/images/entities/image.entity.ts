import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Student } from '../../../students/entities/student.entity';
import { Exam } from '../../../teacher/exams/entities/exam.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({})
  url?: string;

  @ManyToOne(() => User, (user) => user.images, { onDelete: 'CASCADE' ,nullable:true,})
  
  user?: User;
  @ManyToOne(()=>Student,(student)=>student.images,{onDelete:"CASCADE"})
  
  student?:Student;
  @ManyToOne(()=>Exam,(exam)=>exam.images,{onDelete:"CASCADE"})
  
  exam?:Exam;
  @Column({nullable:true})
  examimg?:string;
}

