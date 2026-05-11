import { IsNotEmpty } from "class-validator";

export class CreateLessonDto {
    type:string
    question:string
    answer:string
}

export class UpdateLessonPdfDto {
  @IsNotEmpty()
  pdfPath: string;
}