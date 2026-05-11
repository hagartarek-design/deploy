import { Course } from "../../courses/entities/course.entity";
import { Student } from "../../students/entities/student.entity";
import { Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity('student_course')
export class StudentCourse {
  @PrimaryColumn({ name: 'student_id' })
  student_id: number;

  @PrimaryColumn({ name: 'course_id' })
  course_id: number;

//   @ManyToOne(() => Student, { onDelete: 'CASCADE' })
//   student: Student;
// // @OneToMany(()=>StudentCourse,(student_course)=>student_course.student)
// // student_course:StudentCourse[];
//   @ManyToOne(() => Course, { onDelete: 'CASCADE' },)
//   course: Course;
  
  
@ManyToOne(() => Student, { onDelete: 'CASCADE' })
@JoinColumn({ name: 'student_id' })
student: Student;

@ManyToOne(() => Course, { onDelete: 'CASCADE' })
@JoinColumn({ name: 'course_id' })
course: Course;

}
