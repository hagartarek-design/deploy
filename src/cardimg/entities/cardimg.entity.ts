import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cardimg {
@PrimaryGeneratedColumn()
id:string
@Column()
img:string
// @ManyToMany()


}
