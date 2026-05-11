import { CourseInfo } from "../../../course_info/entities/course_info.entity";
import { CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity()
export class Dailytable {
@PrimaryGeneratedColumn()
id:number
      @CreateDateColumn()
      created_date:Timestamp
      @UpdateDateColumn()
      Updated_date:Timestamp
    @OneToMany(
      () => CourseInfo,
      (courseinfo) => courseinfo.dailytable,
    
    )
    course_info:CourseInfo[]
}
