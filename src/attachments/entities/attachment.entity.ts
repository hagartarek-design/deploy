import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Assignment } from '../../assignments/entities/assignment.entity';
import { Exam } from "../../teacher/exams/entities/exam.entity";
import { Cart } from "../../cart/entities/cart.entity";
import { Student } from "../../students/entities/student.entity";

@Entity()
export class Attachment {
    @PrimaryGeneratedColumn()
      id:number
    @Column({nullable:true})
    cycle:string
    @Column({})
    price:number
    @Column({nullable:true})
    countassign:number
    // @Column({nullable:true})
    // videos:string
    // @Column({nullable:true})
    // pdf:string  
    @Column({})
    code:string
    @Column({})
    isUsed:boolean
    @Column({})
    amount:number

@OneToMany(()=>Assignment,(assignment)=>assignment.attachment)
assignments?:Assignment[]    
@OneToMany(()=>Exam,(exam)=>exam.attachment)
exam?:Exam []   
@ManyToOne(()=>Student,(student)=>student.attachments)
student?:Student   
@OneToMany(()=>Cart,(cart)=>cart.attachment)
cart?:Cart []   
@Column({nullable:true})
status?:string
@Column({nullable:true})

createdAt:Date
}
