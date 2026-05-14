import { Cart } from '../../../cart/entities/cart.entity';
import { Content } from "../../../content/entities/content.entity";
import { Section } from "../../../sections/entities/section.entity";
import { Student } from "../../../students/entities/student.entity";
import { Exam } from "../../../teacher/exams/entities/exam.entity";
import { Userquestion } from "../../../teacher/userquestion/entities/userquestion.entity";
export declare class Lesson {
    id: number;
    videoProgress: {
        [contentId: string]: {
            isCompleted: boolean;
            lastPosition: number;
            totalDuration: number;
            percentage: number;
            lastUpdated: Date;
        };
    };
    viewedCount: number;
    viewedImages: number;
    percentage: number;
    percentageAnswer: number;
    viewPercent: number;
    totalImages: number;
    totalVideosCount: number;
    completedVideosCount: number;
    isUsed: boolean;
    imagePaths: string[];
    totalPages: number;
    filePath: string;
    pageCount: number;
    cart: Cart[];
    pageOrder: string;
    createdAt: Date;
    originalName2: string;
    price: number;
    extractedText: string;
    fileData: Buffer;
    student: Student;
    name: string;
    question_name: string;
    question: string;
    answer: string;
    course_num: number;
    questions: Userquestion[];
    exams: Exam[];
    content: Content[];
    userquestions: Userquestion[];
    section: Section;
    placecountry: string;
    originalName: string;
    mimetype: string;
    mimeTypes: string;
    filename: string;
    filename2: string;
    path: string;
    path2: string;
    size: number;
    newIndex: number;
    position: number;
    updatedAt: Date;
    pdfPath: string;
    pdfImages: string[];
    pdfViews: number[];
    totalProgress: number;
    overallProgress: number;
}
export declare class ProgressTrackDto {
    currentTime: number;
    duration: number;
    percentage: number;
}
export declare class TrackProgressDto {
    currentTime: number;
    duration: number;
}
export declare class CreatePdfDto {
    originalName: string;
    filename2: string;
    filePath: string;
    totalPages: number;
}
