import { Lesson } from "../../teacher/lesson/entities/lesson.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ManyToOne } from "typeorm/decorator/relations/ManyToOne";
@Entity()
export class Content {
@PrimaryGeneratedColumn()
id:number

     @ManyToOne(()=>Lesson,(lesson)=>lesson.content)
         lesson:Lesson[]
         @Column({nullable:true})
         title:string
// @Column({nullable :true})
// type:string
@Column({ nullable: true })
  duration: number; // For videos only

  @Column({ nullable: true })
  order: number;
}
