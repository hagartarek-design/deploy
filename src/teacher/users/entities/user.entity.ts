// import { userRoles } from "common/enums";
// import { Student } from "src/students/entities/student.entity";
// import { User } from "src/teacher/users/entities/user.entity";
// import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

// @Entity()
// export class Role {

// @PrimaryGeneratedColumn()
// id:number
// @Column({nullable:true})
// endpoint:string
// @Column({nullable:true})
// modules:string
// @Column({unique:true,default:userRoles.USER})
// name:string
// @Column({default:false})
// iscanstudent:boolean
// @Column({default :false})
// iscanteacher:boolean
// @Column({nullable:true})
// method:string
// @OneToMany(()=>User,user=>user.role)
// users:User[]
// @OneToMany(()=>Student,student=>student.role)
// student:Student[]
// }
// src/roles/entities/role.entity.ts
import { Entity, Column, PrimaryGeneratedColumn,OneToMany } from 'typeorm';
import { User } from "../../teacher/users/entities/user.entity";
@Entity('roles') 
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  module_name: string;

  @Column()
  endpoint: string;
  @Column({nullable:true})
  name: string;

  @Column()
  method: string;

  @Column({ default: false })
  can_teacher: boolean;
@Column({nullable:true})
query:string;
  @Column({ default: false })
  can_student: boolean;
@OneToMany(()=>User,user=>user.role)
users:User[]
@OneToMany(()=>User,user=>user.roles) 
user:User[]
  // @Column({ default: false })
  // can_user: boolean; 
}