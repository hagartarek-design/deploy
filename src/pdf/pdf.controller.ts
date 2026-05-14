import { Query } from '@nestjs/common';
import {
  Controller,
  Get,
  Param,
  UseInterceptors,
  UploadedFile,
  NotFoundException,
  Post,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
// import {}
import { PdfService } from './pdf.service';
// import { Public } from 'common/decorator/public.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from 'src/teacher/lesson/entities/lesson.entity';
import { Repository } from 'typeorm';
import { Response } from 'express';
import { Section } from 'src/sections/entities/section.entity';
import { Public } from 'src/common/decorator/public.decorator';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService

,@InjectRepository(Lesson) private readonly lessonRepo:Repository<Lesson>
,@InjectRepository(Section) private readonly sectionRepo:Repository<Section>

  ) {}
// @Public()
//   @Patch(':id/pdf')
//   @UseInterceptors(
//     FileInterceptor('file', {
//       storage: diskStorage({
//         destination: './uploads/pdfs',
//         filename: (req, file, callback) => {
//           const uniqueName = Date.now() + extname(file.originalname);
//           callback(null, uniqueName);
//         },
//       }),
//       fileFilter: (req, file, callback) => {
//         if (!file.mimetype.includes('pdf')) {
//           return callback(new Error('Only PDF files are allowed!'), false);
//         }
//         callback(null, true);
//       },
//       limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
//     }),
//   )
//   async uploadPdf(@Param('id') id: number, @UploadedFile() file: Express.Multer.File) {
//     if (!file) throw new NotFoundException('PDF file missing');

//     // Convert to absolute path + normalize slashes
//    let absolutePath = path.resolve(file.path).replace(/\\/g, '/');
//   console.log('Saved PDF path:', absolutePath);
  
//     return this.pdfService.updatePdf(id, file.path);
//   }




@Public()
@Post('upload/:lessonId')
@UseInterceptors(
  FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/pdfs',
      filename: (req, file, cb) => {
        const fileName = `${Date.now()}${path.extname(file.originalname)}`;
        cb(null, fileName);
      },
    }),
  }),
)

async uploadPdf(
  @Param('lessonId') lessonId: number,
  @UploadedFile() file: Express.Multer.File
) {
  const pdfPath = file.path;
  const outputDir = path.join(__dirname, '..', '..', 'uploads', 'pdf-images');

  const images = await this.pdfService.convertPdfToImages(pdfPath, outputDir);

  const lesson = await this.pdfService.savePdfImages(lessonId, file.filename, images);

  if (!lesson.pdfViews || lesson.pdfViews.length !== images.length) {
   lesson.pdfViews = Array(images.length).fill(0); 
await this.lessonRepo.save(lesson);
    await this.lessonRepo.save(lesson); 
  }
  console.log('pdfViews:', lesson.pdfViews); // 
  return {
    lessonId: lesson.id,
    pdf: file.filename,
    images,
    lesson,
  };
}



@Public()
@Get('section/:sectionId/pdf-percent')
async getSectionPdfPercent(@Param('sectionId') sectionId: number) {
  const lessons = await this.lessonRepo.find({
    where: { section: { id: sectionId } },
    relations: ['content'],
  });

  const pdfLessons = lessons.filter(
    (lesson) =>
      lesson.content &&
      lesson.content.some((c) => c.title === 'pdf')
  );

  if (pdfLessons.length === 0) {
    return { sectionId, percent: 0, totalPages: 0, viewedPages: 0 };
  }

  let totalPages = 0;
  let viewedPages = 0;

  for (const lesson of pdfLessons) {
    if (!lesson.pdfImages || lesson.pdfImages.length === 0) continue;

    totalPages += lesson.pdfImages.length;

    // Ensure pdfViews array exists
    if (!lesson.pdfViews || lesson.pdfViews.length !== lesson.pdfImages.length) {
      lesson.pdfViews = Array(lesson.pdfImages.length).fill(0);
      await this.lessonRepo.save(lesson);
    }

    // الآن pdfViews رقمية بالفعل
    viewedPages += lesson.pdfViews.reduce((a, b) => a + b, 0);
  }

  const percent = totalPages === 0 ? 0 : Math.round((viewedPages / totalPages) * 100);

  return {
    sectionId,
    percent,       // الآن سيكون بين 0 و 100
    totalPages,
    viewedPages,
  };
}

// @Get ('')
// async getpercentoflesson(lessonId:number){
// const lesson =await this .lessonRepo.findOne({where:{id:lessonId}})
// const lessonSum =await this .lessonRepo.find()
// const lessonpdf=await lessonSum.some
// }

@Public()
@Get('section/:sectionId/pdf-percent')
async getlessonsection(@Param('sectionId') sectionId: number) {
  const lessons = await this.lessonRepo.find({
    where: { section: { id: sectionId } },
    relations: ['content'],
  });

  const pdfLessons = lessons.filter(
    (lesson) =>
      lesson.content &&
      lesson.content.some((c) => c.title === 'pdf')
  );

  if (pdfLessons.length === 0) {
    return { sectionId, percent: 0, totalPages: 0, viewedPages: 0 };
  }

  let totalPages = 0;
  let viewedPages = 0;

  for (const lesson of pdfLessons) {
    if (!lesson.pdfImages || lesson.pdfImages.length === 0) continue;

    totalPages += lesson.pdfImages.length;

    if (!lesson.pdfViews || lesson.pdfViews.length !== lesson.pdfImages.length) {
      lesson.pdfViews = Array(lesson.pdfImages.length).fill(0);
      await this.lessonRepo.save(lesson);
    }

    // الآن pdfViews رقمية بالفعل
    viewedPages += lesson.pdfViews.reduce((a, b) => a + b, 0);
  }

  const percent = totalPages === 0 ? 0 : Math.round((viewedPages / totalPages) * 100);

  return {
    sectionId,
    percent,      
    totalPages,
    viewedPages,
  };
}


@Public()
@Get('lesson/:lessonId/pdf-percent')
async getLessonPdfPercent(@Param('lessonId') lessonId: number) {
  const lesson = await this.lessonRepo.findOne({
    where: { id: lessonId },
    relations: ['content'],
  });

  if (!lesson) {
    return { lessonId, percent: 0, totalPages: 0, viewedPages: 0 };
  }

  const hasPdfContent =
    lesson.content &&
    lesson.content.some((c) => c.title === 'pdf');

  if (!hasPdfContent) {
    return { lessonId, percent: 0, totalPages: 0, viewedPages: 0 };
  }

  if (!lesson.pdfImages || lesson.pdfImages.length === 0) {
    return { lessonId, percent: 0, totalPages: 0, viewedPages: 0 };
  }

  const totalPages = lesson.pdfImages.length;

  // pdfViews لازم تكون نفس عدد الصفحات
  if (!lesson.pdfViews || lesson.pdfViews.length !== totalPages) {
    lesson.pdfViews = Array(totalPages).fill(0);
    await this.lessonRepo.save(lesson);
  }

  const viewedPages = lesson.pdfViews.reduce((a, b) => a + b, 0);

  const percent = totalPages === 0 ? 0 : Math.round((viewedPages / totalPages) * 100);

  return {
    lessonId,
    percent,
    totalPages,
    viewedPages,
  };
}



// @Public()
// @Get('section/:sectionId/pdf-percent')
// async getSectionPdfPercent(@Param('sectionId') sectionId: number) {
//   const lessons = await this.lessonRepo.find({ 
//     where: { section: { id: sectionId } } 
//   });

//   const pdfLessons = lessons.filter(l => l.pdfImages && l.pdfImages.length > 0);
  
//   if (pdfLessons.length === 0) return { percent: 0 };

//   let totalPossibleViews = 0;
//   let actualViews = 0;

//   for (const lesson of pdfLessons) {
//     const pageCount = lesson.pdfImages.length;
//     totalPossibleViews += pageCount;
    
//     // Count how many pages have been viewed at least once
//     if (lesson.pdfViews && lesson.pdfViews.length === pageCount) {
//       // Assuming pdfViews[i] > 0 means page i was viewed
//       const viewedPages = lesson.pdfViews.filter(viewCount => viewCount > 0).length;
//       actualViews += viewedPages;
//     }
//   }

//   const percent = totalPossibleViews === 0 ? 0 : Math.round((actualViews / totalPossibleViews) * 100);
  
//   return { sectionId, percent };
// }

// @Public()
// @Get('section/:sectionId/pdf-percent')
// async getSectionPdfPercent(@Param('sectionId') sectionId: number) {
//   // جلب كل الدروس في الـ section
//   const lessons = await this.lessonRepo.find({
//     where: {section:{id: sectionId} },
//   });

//   // حساب النسبة لكل درس
//   const result = lessons
//     .filter(lesson => lesson.pdfImages && lesson.pdfImages.length > 0)
//     .map(lesson => {
//       const totalPages = lesson.pdfImages.length;
//       const viewedPages = lesson.pdfViews ? lesson.pdfViews.reduce((a,b) => a+b,0) : 0;
//       const percent = totalPages === 0 ? 0 : Math.round((viewedPages / totalPages) * 100);
//       return {
//         lessonId: lesson.id,
//         percent
//       };
//     });

//   return result;
// }



// @Public()
// @Get('lesson/:lessonId/image/:index')
// async getLessonImage(
//   @Param('lessonId') lessonId: number,
//   @Param('index') index: number,
//   @Res() res: Response,
// ) {
//   const lesson = await this.lessonRepo.findOne({ where: { id: lessonId } });

//   if (!lesson || !lesson.pdfImages || lesson.pdfImages.length === 0) {
//     throw new NotFoundException('No images found for this lesson');
//   }

//   if (index < 0 || index >= lesson.pdfImages.length) {
//     throw new NotFoundException('Image index out of range');
//   }

//   // Update view
//   if (!lesson.pdfViews) lesson.pdfViews = Array(lesson.pdfImages.length).fill(0);
//   lesson.pdfViews[index] = 1;
//   await this.lessonRepo.save(lesson);

//   const imageUrl = path.join(
//     __dirname,
//     '..',
//     '..',
//     'uploads',
//     'pdf-images',
//     path.basename(lesson.pdfImages[index]),
//   );

//   return res.sendFile(imageUrl);
// }
async getSolvedQuestionsPercentBySection(sectionId: number) {
  const lessons = await this.lessonRepo
    .createQueryBuilder('lesson')
    .leftJoinAndSelect('lesson.content', 'content')
    .leftJoinAndSelect('lesson.questions', 'questions')
    .where('lesson.sectionId = :sectionId', { sectionId })
    .andWhere('content.title = :title', { title: 'واجبات و امتحنات' })
    .getMany();

  if (!lessons.length) return { percent: 0 };

  const allQuestions = lessons.flatMap(l => l.questions || []);
  if (!allQuestions.length) return { percent: 0 };

  const solved = allQuestions.filter(q => q.solved).length;

  const percent = Math.round((solved / allQuestions.length) * 100);

  return { percent };
}

@Public()
@Get('section/:sectionId/full-progress')
async getFullSectionProgress(@Param('sectionId') sectionId: number) {


  const section = await this.sectionRepo.findOne({ where: { id: sectionId },relations:['lesson'] });
  const videoPercent = section?.viewingWatching || 0;


  const pdf = await this.getSectionPdfPercent(sectionId);
  const pdfPercent = pdf.percent;


  const questions = await this.getSolvedQuestionsPercentBySection(sectionId);
  const questionsPercent = questions.percent;


  const finalPercent = Math.round(
    (videoPercent + pdfPercent + questionsPercent) / 3
  );

  return {
    sectionId,
    finalPercent,   
    videoPercent,
    pdfPercent,section,
    questionsPercent
  };
}
@Public()
@Get('section/:sectionId/full-progress')
async getFullSectionProgres(@Param('sectionId') sectionId: number) {


  const section = await this.sectionRepo.findOne({ where: { id: sectionId },relations:['lesson','student'] });
  const videoPercent = section?.viewingWatching || 0;


  const pdf = await this.getSectionPdfPercent(sectionId);
  const pdfPercent = pdf.percent;


  const questions = await this.getSolvedQuestionsPercentBySection(sectionId);
  const questionsPercent = questions.percent;


  const finalPercent = Math.round(
    (videoPercent + pdfPercent + questionsPercent) / 3
  );

  return {
    sectionId,
    finalPercent,   
    videoPercent,
    pdfPercent,section,
    questionsPercent
  };
}
// @Public()
@Get('lesson/:lessonId/full')
async getsection(@Param('lessonId') lessonId: number) {


  const lesson = await this.lessonRepo.findOne({ where: { id: lessonId }});
const percentage= lesson.percentage;
const percentageAnswer=lesson.percentageAnswer;
const viewPercent=lesson.viewPercent
  // const videoPercent = section?.viewingWatching || 0;


  // const pdf = await this.getSectionPdfPercent(lessonId);
  // const pdfPercent = pdf.percent;


  // const questions = await this.getSolvedQuestionsPercentBySection(lessonId);
  // const questionsPercent = questions.percent;


  // const finalPercent = Math.round(
  //   (videoPercent + pdfPercent + questionsPercent) / 3
  // );

  return {
    lessonId,
  viewPercent,
  percentage,percentageAnswer
  };
}
@Public()
@Get('lesson/:lessonId/image/:index')
async getLessonImage(
  @Param('lessonId') lessonId: number,
  @Param('index') index: number,
  @Res() res: Response,
) {
  const lesson = await this.lessonRepo.findOne({ where: { id: lessonId } });

  if (!lesson || !lesson.pdfImages || lesson.pdfImages.length === 0) {
    throw new NotFoundException('No images found for this lesson');
  }

  if (index < 0 || index >= lesson.pdfImages.length) {
    throw new NotFoundException('Image index out of range');
  }

  // Ensure pdfViews exists
  if (!lesson.pdfViews || lesson.pdfViews.length !== lesson.pdfImages.length) {
    lesson.pdfViews = Array(lesson.pdfImages.length).fill(0);
  }

  // Mark viewed
  lesson.pdfViews[index] = 1;

  await this.lessonRepo.save(lesson);

  const imageUrl = path.join(
    __dirname,
    '..',
    '..',
    'uploads',
    'pdf-images',
    path.basename(lesson.pdfImages[index]),
  );

  return res.sendFile(imageUrl);
}


  // @Public () 
  // @Get('lesson/:lessonId/image/:index') 
  // async getLessonImage( @Param('lessonId') lessonId: number, @Param('index') index: number,
  //  @Res() res: Response, ) {
  //    const lesson = await this.lessonRepo.findOne({ where: { id: lessonId } }); 
  //    if (!lesson || !lesson.pdfImages || lesson.pdfImages.length === 0) { 
  //     throw new NotFoundException('No images found for this lesson'); }
  //      if (index < 0 || index >= lesson.pdfImages.length) {
  //        throw new NotFoundException('Image index out of range'); } 
  //        const imageUrl = path.join(__dirname, '..', '..', 'uploads', 'pdf-images',
  //          path.basename(lesson.pdfImages[index])); return res.sendFile(imageUrl); }
// @Public ()
// @Get('lesson/:lessonId/image/:index')
// async getLessonImage(
//   @Param('lessonId') lessonId: number,
//   @Param('index') index: number,
//   @Res() res: Response,
// ) {
//   const lesson = await this.lessonRepo.findOne({ where: { id: lessonId } });
//   if (!lesson || !lesson.pdfImages || lesson.pdfImages.length === 0) {
//     throw new NotFoundException('No images found for this lesson');
//   }

//   if (index < 0 || index >= lesson.pdfImages.length) {
//     throw new NotFoundException('Image index out of range');
//   }

//   const imageUrl = path.join(__dirname, '..', '..', 'uploads', 'pdf-images', path.basename(lesson.pdfImages[index]));
//   return res.sendFile(imageUrl);
// }


}