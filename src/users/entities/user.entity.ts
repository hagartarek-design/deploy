import { Role } from "../../role/entities/role.entity";
import { Student } from "../../students/entities/student.entity";
import { User } from "../../teacher/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({nullable :true })
   name:string;
  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  provider: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Role, role => role.users, { eager: true })
  @JoinColumn({ name: 'role_id' })
  role: Role;
@OneToOne(() => User, user => user.user, { nullable: true })
@JoinColumn({ name: 'teacher_id' }) // FK هنا
teacher?: User;
@OneToOne(() => Student, users => users.users, { nullable: true })
@JoinColumn({ name: 'student_id' }) // FK هنا
student?: Student;
  // @OneToOne(() => Student, student => student.user)
  // student?: Student;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
 @Column({
  type: 'varchar',
  default: 'user',
})
roles: 'user' | 'student';
@Column({nullable:true})
refreshToken :string
@Column({nullable:true})
token :string

}
