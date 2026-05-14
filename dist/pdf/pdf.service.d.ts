import { Repository } from 'typeorm';
import { Lesson } from 'src/teacher/lesson/entities/lesson.entity';
export declare class PdfService {
    private readonly lessonRepo;
    constructor(lessonRepo: Repository<Lesson>);
    convertPdfToImages(pdfPath: string, outputDir: string): Promise<string[]>;
    updatePdf(id: number, pdfPath: string): Promise<Lesson>;
    getPdfPath(id: number): Promise<{
        pdfPath: string;
    }>;
    savePdfImages(lessonId: number, pdfPath: string, images: string[]): Promise<Lesson>;
}
