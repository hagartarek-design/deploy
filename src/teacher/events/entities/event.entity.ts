import { Course } from "../../../courses/entities/course.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity()
export class Event {
@PrimaryGeneratedColumn()
id:number
@Column()
title:string
@Column()
description:string
@Column({ type: 'date' })
eventDate: Date;
@CreateDateColumn()
createddate:Timestamp
@UpdateDateColumn()
updateddate:Timestamp

@ManyToOne(() => Course, (product) => product.event, {
    
  })
  course: Course;
}
