import { Optional } from "@nestjs/common";
import { IsOptional } from "class-validator";
import { Assignment } from "../../../assignments/entities/assignment.entity";
import { Exam } from "../../../teacher/exams/entities/exam.entity";

import { Image } from "../../../teacher/images/entities/image.entity";
import { Section } from "../../../sections/entities/section.entity";
import { Column,JoinTable, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { Course } from "../../../courses/entities/course.entity";
// import { Role } from "../../../role/entities/role.entity";
import { Users } from "../../../users/entities/user.entity";
@Entity()

export class User {
  @PrimaryGeneratedColumn() 
  id: number;

  

  @Column({nullable :true,default:"1"})
  grade:string
  @Column({ unique: true, nullable: true })
  @Optional()
  email: string;
  // @Column({nullable :true})
  // role:string
  provider:string;
  @Column({ nullable: true })
  password: string;
  @Column({nullable: true})
  @IsOptional()
  phone?:string
  @Column({nullable: true})
  // @Column({nullable: true})
  cardimg:string
  @Column({nullable: true})
  examcardimg:string
  @Column({nullable: true})
  assigcardimg:string
  @Column({nullable:true})
  username:string
  @Column({nullable:true})
  image:string
  
  @Column({ unique: true, nullable: true })
  googleId: string;
  
  @Column({ nullable: true })
  refreshToken: string; 
  @Column({ nullable: true })
  resetToken: string;

  
  

  
  
  
  @Column({ default: true ,nullable:true})
  isActive: boolean;
  @DeleteDateColumn()
  deletedAt?: Date; 
  @Column({nullable: true})
  fullname:string
  @OneToMany(() => Image, (image) => image.user, { cascade: true })
  images: Image[];
  @OneToMany(() => Section, (section) => section.userId, { cascade: true })
  section: Section[];
  @OneToMany(() => Assignment, (assignment) => assignment.userId, { cascade: true })
  assignment: Assignment[];
  @OneToMany(() => Exam, (exam) => exam.userId, { cascade: true })
  exam: Exam[];
  
  
    @ManyToMany(
          () => Course, 
          course => course.users,
          {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'})
          @JoinTable({
            name: 'user_course',
            joinColumn: {
              name: 'user_id',
              referencedColumnName: 'id',
            },
            inverseJoinColumn: {
              name: 'course_id',
              referencedColumnName: 'id',
            },
          })
          courses?: Course[];
  

  

  



// F


// @Column({ unique: true })
//   googleId: string;

//   @Column()
//   email: string;

  @Column({nullable:true})
  name: string;

  @Column({ nullable: true })
  picture: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

// @ManyToOne(()=>Role,role=>role.users,)
// @JoinColumn({name:'role_id'})
// role:Role
@Column({
  type: 'varchar',
  default: 'user',
})
roles: 'user' | 'student';
//  @ManyToOne(() => Role, role => role.user, { eager: true })
//   @JoinColumn({ name: 'role_id' })
//   roles: Role;
// user.entity.ts
@Column({ default: 'user' })
role: 'user' | 'student';
// @Column({})
@OneToOne(() => Users, users => users.teacher)
user: Users;

}
