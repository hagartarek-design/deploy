import { Lesson } from '../../teacher/lesson/entities/lesson.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
// import { Lesson } from './lesson.entity';

@Entity()
export class Pdf {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:true
  })
  filename: string;

  @Column({nullable:true
  })
  path: string;
 @Column({nullable:true})
  originalName: string;

@Column('simple-array', { nullable: true })
pdfViews: number[];



  // @ManyToOne(() => Lesson, lesson => lesson.pdf)
  // lesson: Lesson;

}