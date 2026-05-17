import { PdfService } from './pdf.service';
import { Lesson } from 'src/teacher/lesson/entities/lesson.entity';
import { Repository } from 'typeorm';
import { Response } from 'express';
import { Section } from 'src/sections/entities/section.entity';
export declare class PdfController {
    private readonly pdfService;
    private readonly lessonRepo;
    private readonly sectionRepo;
    constructor(pdfService: PdfService, lessonRepo: Repository<Lesson>, sectionRepo: Repository<Section>);
    uploadPdf(lessonId: number, file: Express.Multer.File): Promise<{
        lessonId: number;
        pdf: string;
        images: string[];
        lesson: Lesson;
    }>;
    getSectionPdfPercent(sectionId: number): Promise<{
        sectionId: number;
        percent: number;
        totalPages: number;
        viewedPages: number;
    }>;
    getlessonsection(sectionId: number): Promise<{
        sectionId: number;
        percent: number;
        totalPages: number;
        viewedPages: number;
    }>;
    getLessonPdfPercent(lessonId: number): Promise<{
        lessonId: number;
        percent: number;
        totalPages: number;
        viewedPages: number;
    }>;
    getSolvedQuestionsPercentBySection(sectionId: number): Promise<{
        percent: number;
    }>;
    getFullSectionProgress(sectionId: number): Promise<{
        sectionId: number;
        finalPercent: number;
        videoPercent: number;
        pdfPercent: number;
        section: Section;
        questionsPercent: number;
    }>;
    getFullSectionProgres(sectionId: number): Promise<{
        sectionId: number;
        finalPercent: number;
        videoPercent: number;
        pdfPercent: number;
        section: Section;
        questionsPercent: number;
    }>;
    getsection(lessonId: number): Promise<{
        lessonId: number;
        viewPercent: number;
        percentage: number;
        percentageAnswer: number;
    }>;
    getLessonImage(lessonId: number, index: number, res: Response): Promise<void>;
}
