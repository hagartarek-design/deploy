import { IsNotEmpty, IsString, IsNumber ,Max,Min} from 'class-validator';
import { Cart } from '../../../cart/entities/cart.entity';
import { Content } from "../../../content/entities/content.entity"
import { Pdf } from '../../../pdf/entities/pdf.entity';
// import { Pdf } from '../../../pdf/entities/pdf.entity';
import { Section } from "../../../sections/entities/section.entity"
import { Student } from "../../../students/entities/student.entity"
import { Exam } from "../../../teacher/exams/entities/exam.entity"
// import { PdfImage } from "../../../pdf-image/entities/pdf-image.entity";
// import { Pdf } from '../../../Pdf/entities/Pdf.entity';

import { Userquestion } from "../../../teacher/userquestion/entities/userquestion.entity"
// import Content from "twilio/lib/rest/Content"
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Lesson {

@PrimaryGeneratedColumn()
    id:number
   
    @Column('json', { nullable: true })
  videoProgress: {
    [contentId: string]: {
      isCompleted: boolean;
      lastPosition: number;
      totalDuration: number;
      percentage: number;
      lastUpdated: Date;
    }
  };
    @Column({nullable:true,default:0})
    viewedCount:number
      @Column({nullable:true,})
  viewedImages: number; // Store indices of viewed images
@Column({ type: 'float', default: 0 })
  percentage: number;
@Column({nullable:true,default:0})
  percentageAnswer: number;
  @Column({nullable:true,default:0})
  viewPercent:number
  @Column({nullable:true,default:0})
  totalImages: number;
// @Column('json',{nullable:true})
// pdfImages:string[]    
    // @Column('simple-json',{nullable:true})
    // metadata2:{
    //   pages:number;
    //   info:any;
    //   text:string
    // }
  //    @Column()
  // mimetype2: string;
@Column({default:0})
totalVideosCount:number

@Column({default:0})
completedVideosCount:number
    @Column({nullable:true})
    isUsed:boolean
  @Column('simple-array',{nullable:true}) // store image paths as CSV
  imagePaths: string[];

  // @Column('simple-array')
  // imagePaths: string[];
   @Column('int',{nullable:true})
  totalPages: number;


    @Column({nullable:true})
  filePath: string;

  @Column('int', { default: 0 ,nullable:true})
  pageCount: number;
@OneToMany(()=>Cart,(cart)=>cart.lesson)
cart:Cart[]


  @Column('text', { nullable: true })
  pageOrder: string; // Store as JSON string

  @CreateDateColumn()
  createdAt: Date;

  // Helper methods to handle array conversion
  // getPageOrderArray(): number[] {
  //   return this.pageOrder ? JSON.parse(this.pageOrder) : [];
  // }

  // setPageOrderArray(order: number[]): void {
  //   this.pageOrder = JSON.stringify(order);
  // }
// @Column({nullable:true})
// filePath:string
@Column({nullable:true})
originalName2:string
@Column({nullable:true,default:150})
price:number
// @Column({nullable:true})
// metadata2:string
// @Column({nullable:true})
// mimetype2:string
// @Column({})
 @Column('text',{nullable:true})
  extractedText: string;
@Column({nullable:true,type:"longblob"})
fileData:Buffer
    @ManyToOne(() => Student, (student) => student.lesson, {})
      student: Student;
@Column({nullable:true})
    name:string

@Column({nullable:true})
    question_name:string
@Column({nullable:true})
    question:string
@Column({nullable:true})
    answer:string
// @ManyToMany(() => Exam, exams => exams.lessons, {
//     onDelete: 'NO ACTION',
//     onUpdate: 'NO ACTION',
//   })
//   exams?: Exam[];
   @Column({nullable:true})
   course_num:number

  @OneToMany(() => Userquestion, (question) => question.lesson)
  questions: Userquestion[];

  @ManyToMany(() => Exam, exam => exam.lessons)
  exams: Exam[];
  @OneToMany(()=>Content,(content)=>content.lesson)
     content:Content[]
     @ManyToOne(()=>Userquestion,(question)=>question.lessons)
     userquestions:Userquestion[]
     @ManyToOne(()=>Section,(section)=>section.lesson)
     section:Section
     @Column ({nullable:true})
placecountry:string
  @Column({nullable:true})
  originalName: string;

  @Column({nullable:true})
  mimetype: string;
  @Column({nullable:true})
  mimeTypes: string;
  @Column({nullable:true})
  filename: string;
  @Column({nullable:true})
  filename2: string;

  @Column({nullable:true})
  path: string;
   @Column({nullable:true})
  path2: string;
  // @Column({ type: 'int', nullable: true })
  // pageCount: number;
  @Column({ type: 'int', nullable: true })
  size: number;
// @ManyToOne(() => Pdf, pdf => pdf.lesson)
// pdf: Pdf;


  // @Column('int')
  // originalIndex: number;

  @Column('int',{nullable:true})
  newIndex: number;

  // @Column('int')
  // position: number;
  // @Column('int')
  // originalIndex: number;

  // @Column('int')
  // newIndex: number;

  @Column('int',{nullable:true})
  position: number;
//   @Column({ type: 'bigint' })
//   fileSize: number;

//  @OneToMany(() => Pdf, (image) => image.lesson, { cascade: true })
//   images: Pdf[];

  @UpdateDateColumn()
  updatedAt: Date;
 // store PDF filename
  @Column({ nullable: true })
  pdfPath: string;
  
  @Column('json', { nullable: true })
  pdfImages: string[]; //
// @Column('simple-json', { nullable: true })
// pdfViews: number[];
// @Column('simple-array', { nullable: true })
// pdfViews: number[];
@Column('json', { nullable: true })
pdfViews: number[];

@Column({default:0})
totalProgress:number

//  @Column({ type: 'json', nullable: true })
//   videoProgress: {
//     [contentId: string]: {
//       isCompleted: boolean;
//       lastPosition: number;
//       totalDuration: number;
//       percentage: number;
//       lastUpdated: Date;
//     }
  

  @Column({ type: 'float', default: 0 })
  overallProgress: number;

}
// pdf.dto.ts
export class ProgressTrackDto{
  @IsNotEmpty()
  @IsNumber()
  currentTime:number
@IsNotEmpty()
@IsNumber()

  duration :number


  @IsNumber ()
  @Min(0)
  @Max(100)
  percentage:number
}
// import { IsNotEmpty, IsNumber } from 'class-validator';

export class TrackProgressDto {
  @IsNotEmpty()
  @IsNumber()
  currentTime: number;

  @IsNotEmpty()
  @IsNumber()
  duration: number;
}// currentTime:number
export class CreatePdfDto {
  @IsNotEmpty()
  @IsString()
  originalName: string;

  @IsNotEmpty()
  @IsString()
  filename2: string;

  @IsNotEmpty()
  @IsString()
  filePath: string;

  @IsNotEmpty()
  @IsNumber()
  totalPages: number;
}
