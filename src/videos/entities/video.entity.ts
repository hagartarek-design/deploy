import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Video {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    filename: string;
  
    @Column()
    filePath: string;
  
    @Column()
    originalName: string;
  
    @Column()
    mimeType: string;
  
    @Column()
    size: number;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}