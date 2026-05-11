import { CourseInfo } from "../../course_info/entities/course_info.entity";
import { Course } from "../../courses/entities/course.entity";
import { Student } from "../../students/entities/student.entity";
import { Lesson } from "../../teacher/lesson/entities/lesson.entity";
import { User } from "../../teacher/users/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import  {Cart} from "../../cart/entities/cart.entity";
@Entity()
export class Section {
@PrimaryGeneratedColumn()
id:number 
@OneToMany(()=>Lesson,(lesson)=>lesson.section)
lesson?:Lesson[]
// @Column({ default: 0 })
//   totalProgress: number;

  @Column({ default: 0 })
  totalProgress: number;
  @Column({ default: 0 })
  percent: number;
  
  //   @ManyToMany(() => Lesson, lesson => lesson.section)
  // lessons: Lesson[];
// @Column({default:100})
// price:number
 @Column({ type: 'float', default: 0 })
  overallProgress: number;
@Column({default:0})
amount:number
@Column()
isUsed:boolean
@Column({nullable:true})
name:string
@Column()
cardimg:string
@Column({nullable:true})
price:number
@Column({nullable:true})
code:string
@OneToMany(()=>Cart,(cart)=>cart.section)
cart:Cart[]

@Column({nullable:true})
viewingWatching:number
  @ManyToOne(() => Course, (course) => course.section, { onDelete: 'CASCADE' })
  course: Course;
  @ManyToOne(()=>Student,(student)=>student.sections,{onDelete:'CASCADE'})
  student:Student;
  @ManyToOne(() => CourseInfo, (course_info) => course_info.section, { onDelete: 'CASCADE' })
  course_info: CourseInfo ;
  @ManyToOne(() => User, (user) => user.section, { onDelete: 'CASCADE' })
  userId: User;
  @Column({nullable:true})
  description:string 
      @ManyToMany(
          () => Student,
          student => student.sections,
          {onDelete: 'NO ACTION', onUpdate: 'NO ACTION',},
        )
        students?: Student[];
}
