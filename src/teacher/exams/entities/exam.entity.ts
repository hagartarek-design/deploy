import { Optional } from "@nestjs/common";
import { IsOptional } from "class-validator";
import { Course } from "../../../courses/entities/course.entity";
import { Image } from "../../../teacher/images/entities/image.entity";
import { Lesson } from "../../../teacher/lesson/entities/lesson.entity";
import { Student } from "../../../students/entities/student.entity";
import { User } from "../../../teacher/users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Attachment } from "../../../attachments/entities/attachment.entity";
import { Userquestion } from "../../../teacher/userquestion/entities/userquestion.entity";

@Entity()
export class Exam {
  @PrimaryGeneratedColumn()
  id: number;
  

  // REMOVE ANY @Column DECORATOR FROM THIS FIELD
  @OneToMany(() => Userquestion, (question) => question.exam, {
    cascade: true,
    nullable: true
  })
  questions: Userquestion[];

  @Column({ nullable: true })
  @Optional()
  imgcart?: string;

  @Column({ nullable: true })
  @Optional()
  examplace?: string;

  @ManyToOne(() => Course, (course) => course.exam)
  course: Course;

  @ManyToOne(() => Student, (student) => student.exam)
  student: Student;

  @ManyToOne(() => Attachment, (attachment) => attachment.exam)
  attachment: Attachment;

  @ManyToMany(() => Lesson, lesson => lesson.exams)
  @JoinTable({
    name: 'exams_lessons',
    joinColumn: {
      name: 'exam_id', 
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'lesson_id',
      referencedColumnName: 'id',
    },
  })
  lessons: Lesson[];

  @Column({ nullable: true })
  @Optional()
  attendence?: boolean;

  @Column({ nullable: true })
  grade?: number;

  @OneToMany(() => Image, (image) => image.exam, { cascade: true })
  images: Image[];

  @ManyToOne(() => User, (user) => user.exam, { onDelete: 'CASCADE' })
  userId: User;

  @Column({ nullable: true, default: "exam" })
  @IsOptional()
  exam_name?: string;

  @Column({ nullable: true })
  @IsOptional()
  exam_type?: string;

  @IsOptional()
  @Column({ nullable: true })
  examprice?: number;

  @Column({ nullable: true })
  @IsOptional()
  trials_number?: number;

  @Column({ nullable: true })
  @IsOptional()
  durationmin?: string;

  @Column({ nullable: true })
  @IsOptional()
  totaldegree: string;

  @Column({ nullable: true })
  degree_success: string;

  @Column({ nullable: true, type: 'tinyint' })
  showdegreeEveryQues: number;

  @Column({ nullable: true, type: 'tinyint' })
  showDegreeafter: number;

  @Column({ default: false, nullable: true })
  @Optional()
  online: boolean;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  startdate: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  seedate: Date;
}