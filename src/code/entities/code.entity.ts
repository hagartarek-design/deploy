import { Student } from "../../students/entities/student.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity()
export class Code {
     @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  rechargeCode: string;
  @Column({ nullable: true })
  serial: string;
  @Column()
  amount: number;
@Column({default:0})
balance:number
  @Column({ default: false })
  isRecharged: boolean;

  @Column({ default: false })
  isUsed: boolean;

  @ManyToMany(() =>Student, (students) =>students.rechargeCards)
 students:Student[];
@CreateDateColumn()
createddate:Timestamp
@UpdateDateColumn()
updateddate:Timestamp
}
