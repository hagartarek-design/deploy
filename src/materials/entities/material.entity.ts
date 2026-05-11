import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class Material {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    grade :string
    @Column()
    cycle:string
}
