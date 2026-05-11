import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { Lesson } from './lesson.entity';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';
import * as fs from 'fs';

const execPromise = promisify(exec);
import { Lesson } from 'src/teacher/lesson/entities/lesson.entity';

@Injectable()
export class PdfService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepo: Repository<Lesson>,
  ) {}
 async convertPdfToImages(pdfPath: string, outputDir: string): Promise<string[]> {
    // تأكد إن الـ output directory موجود
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // اسم الملف بدون الامتداد
    const fileName = path.basename(pdfPath, path.extname(pdfPath));

    // أمر Poppler
    const command = `pdftoppm -png "${pdfPath}" "${path.join(outputDir, fileName)}"`;

    try {
      await execPromise(command);

      // رجع قائمة الصور اللي اتعملت
      const files = fs
        .readdirSync(outputDir)
        .filter(f => f.startsWith(fileName) && f.endsWith('.png'))
        .map(f => path.join(outputDir, f));

      return files;
    } catch (error) {
      console.error('Poppler error:', error);
      throw new Error('Failed to convert PDF to images');
    }
  }
  async updatePdf(id: number, pdfPath: string) {
    const lesson = await this.lessonRepo.findOne({ where: { id } });
    if (!lesson) throw new NotFoundException('Lesson not found');

    lesson.pdfPath = pdfPath;
    return this.lessonRepo.save(lesson);
  }

  async getPdfPath(id: number) {
    const lesson = await this.lessonRepo.findOne({ where: { id } });
    if (!lesson || !lesson.pdfPath) throw new NotFoundException('PDF not found');
    if (!fs.existsSync(lesson.pdfPath)) {
      throw new NotFoundException('PDF file missing on disk');
    }
    return { pdfPath: lesson.pdfPath };
  }

// async savePdfImages(lessonId:number ,pdfPath:string ,images:string[]){
//   const lesson=await this.lessonRepo.findOne({where:{id:lessonId}});
//   if(!Lesson) throw new  NotFoundException('Lesson not found')
//     lesson.pdfPath=pdfPath;
//   lesson.pdfImages=images;
//   // this.
//   return this .lessonRepo.save(lesson,)
// } 
async savePdfImages(lessonId:number ,pdfPath:string ,images:string[]){
  const lesson=await this.lessonRepo.findOne({where:{id:lessonId,content:{}}});
  if(!lesson) throw new  NotFoundException('Lesson not found')
    lesson.pdfPath=pdfPath;
  lesson.pdfImages=images;
  // lesson.content.map((e)=>e.lesson.id)
  return this .lessonRepo.save(lesson,)
} 

}
