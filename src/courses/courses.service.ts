import { randomBytes } from 'crypto';
import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { RechargeDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/students/entities/student.entity';
import { CourseAttend } from 'src/course_attend/entities/course_attend.entity';
import { Section } from 'src/sections/entities/section.entity';
import { CourseInfo } from 'src/course_info/entities/course_info.entity';
import { Lesson, TrackProgressDto } from 'src/teacher/lesson/entities/lesson.entity';
import * as fs from 'fs';
import { PDFDocument } from 'pdf-lib';
// import * as fs from 'fs';
// import * as pdfParse from 'pdf-parse';
import * as pdfjsLib from 'pdfjs-dist';
import * as path from 'path';
// import * as pdfParse from 'pdf-parse';
import { fromPath } from 'pdf2pic';
import * as pdfParse from 'pdf-parse';
// import * as path from 'path';
import * as pdf from 'pdf-parse';
import { Cart } from 'src/cart/entities/cart.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
   private readonly Repository:Repository<Course> ,
    @InjectRepository(CourseAttend)
   private readonly course_attend:Repository<CourseAttend> ,
    @InjectRepository(Student)
   private readonly Repository2:Repository<Student> ,
    @InjectRepository(CourseInfo)
   private readonly courseinfo:Repository<CourseInfo> ,
    @InjectRepository(Section)
   private readonly  section:Repository<Section> 
  ,
    @InjectRepository(Cart)
   private readonly  cartRepo:Repository<Cart> 
  ,
    @InjectRepository(Lesson)
   private readonly  lesson:Repository<Lesson> 
  
  ){}

  // create(createCourseDto: CreateCourseDto) {
  //   return 'This action adds a new course';
  // }
async getallCourses(id:number){
  const course=await this.Repository.find({where:{student_id:{id}}});
  // console.log(course);
  // console.log(id);
  
  if(!course)
    return new NotFoundException("course not found")
  return {success:true,course: course};
}



async getbysectionid(id: number, section_id: number) {
  const course = await this.courseinfo.find({
    relations: ['section.course', 'section.lesson'],
    where: {
      students: { id },
      section: { id: section_id },
    },
  });

  if (!course || course.length === 0)
    throw new ConflictException('Section not found');

  // Flatten all lessons from all sections in all courses
  const allLessons = course.flatMap(course =>
    course.section?.flatMap(sec => sec.lesson || []) || []
  );

  const totalLessons = allLessons.length;

  // Filter completed lessons (adjust property name if different)
  const completedLessons = allLessons.filter(lesson => lesson.isUsed).length;

  // Calculate percentage
   const percent =(completedLessons/totalLessons)*100

  return {
    success: true,
    course,
    percent:percent , // e.g. 75.00
    completedLessons,
    totalLessons,
  };
}




async getsectionid(id:number,lesson_id:number){
const course=await this.courseinfo.find({relations:['section.lesson'],where:{
  students:{id},
section:  {lesson:{id:lesson_id}}}})
  if(!course)return new ConflictException('section not found')
    // console.log(section);
    
return{success:true,course}
  // const

}
async getlessonid(id:number,section_id:number){
const course=await this.courseinfo.find({relations:['section.course'],where:{
  students:{id},
  section:{id:section_id}}})
  if(!course)return new ConflictException('section not found')
    // console.log(section);
    
return{success:true,course}
  // const

}










































  async saveVideo(file: Express.Multer.File) {
    const video = this.Repository.create({
      filename: file.filename,
      originalName: file.originalname,
      mimetype: file.mimetype,
      path: file.path,
    });
    return this.Repository.save(video);
  }






























  
// async savePdf(id: string, file: Express.Multer.File) {
//   const pdf = await this.lesson.update(
//     { id },
//     {
//       filename2: file.filename,
//       originalName2: file.originalname,
//       mimetype2: file.mimetype,
//       filePath: file.path,
//     },
//   );

//   return { pdf };
// }



















  
async saveVideoLesson(//id:number,
  file:Express.Multer.File,){
  const lesson =await this.lesson.create(//{id},
    {
    filename:file.filename,
    originalName:file.originalname,
    mimetype:file.mimetype,
    path :file.path
  },);
  await this.lesson.save(lesson)
  return  {lesson}
}
async getVideo(id: number) {
  return await this.Repository.findOneBy({ id });
}


// async pdf(){

// }

//  async getPdfPage(id: string, pageNumber: number) {
//   const pdfFile = await this.lesson.findOneBy({ id });

//   if (!pdfFile) {
//     throw new Error('Lesson not found');
//   }

//   const dataBuffer = fs.readFileSync(path.resolve(pdfFile.path));
//  const data = await pdf(dataBuffer);


//   // Split pages by page break (\f)
//   const pages = data.text.split('\f');
//   const selectedPage = pages[pageNumber - 1] || 'Page not found';

//   return {
//     id,
//     page: pageNumber,
//     content: selectedPage,
//   };
// }
async updatePdf(id:number,file:Express.Multer.File){
  const pdf =await this.lesson.findOne({where:{id}})
  if(!pdf)throw new NotFoundException("pdf not found")
    pdf.name=file.originalname;
  pdf.filePath=`uploads/${file.filename}`;
  pdf.fileData=file.buffer;
  return this.lesson.save(pdf)
}























// @Get('percent/:lessonId')
async trackVideoProgress( lessonId: number, contentId: number, dto: TrackProgressDto) {
  const lesson = await this.lesson.findOne({
    where: { id: lessonId },
  });

  if (!lesson) return;

  if (!lesson.videoProgress) lesson.videoProgress = {};

  const percentage = Math.min(100, (dto.currentTime / dto.duration) * 100);

  lesson.videoProgress[contentId] = {
    isCompleted: percentage >= 95,
    lastPosition: dto.currentTime,
    totalDuration: dto.duration,
    percentage: percentage,
    lastUpdated: new Date(),
  };

  await this.lesson.save(lesson);

  // update section percent
  await this.updateSectionPercent(lesson.section.id);

  return { percentage };
}
async updateSectionPercent(sectionId: number) {
  const section = await this.section.findOne({
    where: { id: sectionId },
    relations: ['lesson', 'lesson.content'],
  });

  if (!section) return;

  // Only lessons with video content (المحاضرات)
  const lectureLessons = section.lesson.filter(lesson =>
    lesson.content?.some(c => c.title === 'المحاضرات')
  );

  let totalDuration = 0;
  let watchedDuration = 0;

  for (const lesson of lectureLessons) {
    for (const c of lesson.content) {
      if (c.title !== 'المحاضرات') continue;

      // Skip missing progress
      const progress = lesson.videoProgress?.[c.id];
      if (!progress) continue;

      totalDuration += c.duration ?? 0;
      watchedDuration += Math.min(progress.lastPosition, c.duration ?? 0);
    }
  }

  const percent =
    totalDuration === 0 ? 0 : Number(((watchedDuration / totalDuration) * 100).toFixed(2));

  section.percent = percent;
  await this.section.save(section);

  return { percent };
}

async findByIdlesson(
  // id: number
  // ,
  Lesson_id: number, ) {
  return await this.lesson.findOne({
   
    // relations: ['student'], // Include the relation if needed
  where: {
     id: Lesson_id,
      // student: { id: id } // Assuming relation is named 'student'
    }, });
}

async findById(id: number) {
  return await this.Repository.findOne({ where: { id } });
}






async withpaginating(offset:number,limit:number){
  try {
 
    
  return  await this.Repository.find({
    skip:offset,take:limit,select:{course_attend:true,students:true ,},relations:['students','course_attend']})
    
  } catch (error) {
    return {success:false,message:error.message}
    
  }
  } 
  
async allcourses(){
  try {
  return  await this.Repository.find({select:{course_attend:true,students:true ,},relations:['students','course_attend']})
    
  } catch (error) {
    return {success:false,message:error.message}
    
  }
  } 
  async findOne(name: string, grade: string) {
    if (!name || !grade) {
        throw new Error('Invalid parameters: name and grade are required');
    }

    const courses = await this.Repository.findOne({
        where: { name, grade },
        relations: [
            'students',
            'course_attend',
            'course_info.students',
            'course_info.course',
        ],
    });

    if (!courses) {
        throw new NotFoundException('Course not found');
    }

    return courses;
}



async getpagination(offset:number,limit:number){
  return  await this.Repository.find({skip:offset,take:limit,},)
  }

  async findmonth_by_year(month_by_year:string){
    const course =await this.Repository.findOne({
      where:{month_by_year:month_by_year},relations:['course_attend']
    })
    return course;
  }
  async bytypetoday(type:string){
    const types=await this.Repository.findOne({
      where:{type:type},relations:['course_attend']
    })
    return types;
  }
  async findtype(type:string) {
    const courses=await this.Repository.findOne({
      where: {
        type:type
      },
      relations: ['course_attend'],
    });
  
  return courses ;
  }
  

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }
async createPDF(file: Express.Multer.File): Promise<Lesson> {
    const pdfBuffer = fs.readFileSync(file.path);
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    const pageCount = pdfDoc.getPageCount();

    const pdf = this.lesson.create({
      filename: file.filename,
      originalName: file.originalname,
      filePath: file.path,
      pageCount,
      pageOrder: JSON.stringify(Array.from({ length: pageCount }, (_, i) => i)),
    });

    return this.lesson.save(pdf);
  }

  async getPDF(id: number): Promise<Lesson> {
    const pdf = await this.lesson.findOne({ where: { id } });
    if (!pdf) {
      throw new NotFoundException('Lesson not found');
    }
    return pdf;
  }

  async getAllPDFs(): Promise<Lesson[]> {
    return this.lesson.find();
  }

  async reorderPages(id: number, newOrder: number[]): Promise<Lesson> {
    const pdf = await this.getPDF(id);
    
    // Validate new order
    if (newOrder.length !== pdf.pageCount) {
      throw new Error('Invalid page order length');
    }

    // Reorder pages using pdf-lib
    const pdfBuffer = fs.readFileSync(pdf.filePath);
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    
    const reorderedDoc = await PDFDocument.create();
    const copiedPages = await reorderedDoc.copyPages(pdfDoc, newOrder);
    copiedPages.forEach(page => reorderedDoc.addPage(page));

    const modifiedPdfBuffer = await reorderedDoc.save();
    const newFilename = `reordered-${Date.now()}.pdf`;
    const newFilePath = path.join(path.dirname(pdf.filePath), newFilename);
    
    fs.writeFileSync(newFilePath, modifiedPdfBuffer);

    // Update entity
    pdf.filePath = newFilePath;
    pdf.filename = newFilename;
    pdf.pageOrder = JSON.stringify(newOrder);

    return this.lesson.save(pdf);
  }

  async deletePDF(id: number): Promise<void> {
    const pdf = await this.getPDF(id);
    // Delete file from filesystem
    if (fs.existsSync(pdf.filePath)) {
      fs.unlinkSync(pdf.filePath);
    }
    await this.lesson.delete(id);
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }



  async findcoursehasstudents(){
    return await this .Repository.find({})
  }
  
 async findAll(page=1,limit=9,id:number) {
   page = Number(page) || 1;
   limit = Number(limit) || 9;
   const skip=(page-1)*limit;
  //  console.log(typeof(skip));
    const course=await this.Repository.findOne({relations:['student','student_id'],where:{id:id}});
    course.student ?.slice (skip,skip+limit)
    if (!course ) {
      return new ForbiddenException("No course found");
    }
    // console.log(course);
    
    // return new ForbiddenException("no course")
    return course
  }



 

  async getcourseNumStudent(id?:number,page=1,limit=9){
    const skip=(page-1)*limit;
  const course= await this.Repository.find({relations:['student_id','student'],where:{id:id} })
  if(!course)return new NotFoundException("")
    if (course.map((e)=>e.student).length==0) 
      return new NotFoundException("no students found")
  course.forEach((e) => {
    if (Array.isArray(e.student)) {
      e.student = e.student.slice(skip, skip + limit);
    }
  });
  
    return course; 
     
  }


async getonecourseStudent(id: number, page = 1, limit = 9) {
  const skip = (page - 1) * limit;

  const course = await this.Repository.findOne({
    relations: ['student_id', 'student'],
    where: { id },
  });

  if (!course) return new NotFoundException('Course not found');

  if (!Array.isArray(course.student)) {
    course.student = [];
  } else {
    course.student = course.student.slice(skip, skip + limit);
  }

  return course;
}

  async findbyId(id:number,userId,page=1,limit=9,){
    const skip=(page-1)*limit;
    // if(student )
    
      const course= await this.Repository.findOne({
      where:{id:id},relations:['student']
    
   })
     
     if(!course)
      
      return new ForbiddenException("there is no course");
     if(isNaN(id))
      
      return new BadRequestException("nanid");
    
    if(course){
    
      course.student =course.student ?.slice (skip,skip+limit)
    return course
    }
     }
     async getCourseWithStudents(
      id: number,
      userId?: number,
      page = 1,
      limit = 9,
    ) {
      const skip = (page - 1) * limit;
      
      if (isNaN(id)) {
        return new BadRequestException("Invalid ID");
      }
    
      const course = await this.Repository.findOne({
        where: { id },
        relations: ['student_id', 'student']
      });
    
      if (!course) {
        return new NotFoundException("Course not found");
      }
    
      if (course.student) {
        course.student = course.student.slice(skip, skip + limit);
      }
    
      return course;
    }
    
 

 async findmany(){
    return await this.Repository.find({});
    
  }
  async findbytype(){
    return await this.Repository.find({relations:['']})
  }
async findby(name:string,phoneNum:string,
  email:string,
  id:number

){
return await this .Repository.find({
where:{   student:{name:name,phoneNum:phoneNum,email:email},id//id
}
,relations:['student']
})
}
async  byCenterName2( id:number,){
  return await this.Repository.find({where:{id:id},relations:['student_id','student','students']})

}





































  //  async savePdf(file: Express.Multer.File): Promise<Lesson> {
  //   // Extract Lesson metadata
  //   const dataBuffer = fs.readFileSync(file.path);
  //   const pdfData = await pdfParse(dataBuffer);
    
  //   const pdf = this.lesson.create({
  //     filename2: file.filename,
  //     originalName2: file.originalname,
  //     mimeTypes: file.mimetype,
  //     filePath: file.path,
  //     totalPages: pdfData.numpages,
  //     // pageMetadata: this.extractPageMetadata(pdfData),
  //   });

  //   return await this.lesson.save(pdf);
  // }
  
 async savePdf(file: Express.Multer.File): Promise<Lesson> {
    const dataBuffer = fs.readFileSync(file.path);
    const pdfData = await pdfParse(dataBuffer);
    
    const pdf = this.lesson.create({
      filename2: file.filename,
      originalName2: file.originalname,
      mimeTypes: file.mimetype,
      filePath: file.path,
      totalPages: pdfData.numpages,
    });

    return await this.lesson.save(pdf);
  }

//  async getPdfPage(pdfId: string, pageNumber: number): Promise<{ image: string }> {
//     const pdf = await this.lesson.findOne({ where: { id: pdfId } });
    
//     if (!pdf) {
//       throw new Error('Lesson not found');
//     }

//     // Convert Lesson page to image (base64)
//     const imageBuffer = await this.convertPdfPageToImage(pdf.filePath, pageNumber);
//     return { image: imageBuffer.toString('base64') };
//   }

//   private async convertPdfPageToImage(filePath: string, pageNumber: number): Promise<Buffer> {
//     // This is a simplified version - you might want to use a proper Lesson to image library
//     // For production, consider using pdf2pic or similar
//     const dataBuffer = fs.readFileSync(filePath);
    
//     // Using pdfjs-dist for Lesson rendering (client-side would be better for large files)
//     const loadingTask = pdfjsLib.getDocument(dataBuffer);
//     const pdfDocument = await loadingTask.promise;
//     const page = await pdfDocument.getPage(pageNumber);
    
//     const viewport = page.getViewport({ scale: 1.5 });
//     const canvas = require('canvas').createCanvas(viewport.width, viewport.height);
//     const context = canvas.getContext('2d');
    
//     const renderContext = {
//       canvasContext: context,
//       viewport: viewport,
//     };
    
//     await page.render(renderContext).promise;
    
//     return canvas.toBuffer();
//   }

  async getPdfInfo(pdfId: number): Promise<Lesson> {
    return await this.lesson.findOne({ where: { id: pdfId } });
  }


  // async getPdfImages(lessonId: string): Promise<{ images: string[] }> {
  //   const lesson = await this.lesson.findOne({
  //     where: { id: lessonId },
  //   });

  //   if (!lesson) {
  //     throw new Error('Lesson not found');
  //   }

  //   // Convert file paths to URLs
  //   const imageUrls = lesson.imagePaths.map(imagePath => {
  //     const relativePath = imagePath.replace('./uploads/', '');
  //     return `/api/files/images/${relativePath}`;
  //   });

  //   return { images: imageUrls };
  // }

  private extractPageMetadata(pdfData: any): any[] {
    // This is a simple implementation - you might want to enhance it
    const metadata = [];
    for (let i = 0; i < pdfData.numpages; i++) {
      metadata.push({
        pageNumber: i + 1,
        hasText: pdfData.text.length > 0,
        // Add more metadata as needed
      });
    }
    return metadata;
  }

  async getPdfById(id: number): Promise<Lesson> {
    const pdf = await this.lesson.findOne({ where: { id } });
    if (!pdf) {
      throw new NotFoundException('Lesson not found');
    }
    return pdf;
  }

  // async getPdfPage(id: string, pageNumber: number): Promise<Buffer> {
  //   const pdf = await this.getPdfById(id);
    
  //   if (pageNumber < 1 || pageNumber > pdf.totalPages) {
  //     throw new NotFoundException('Page number out of range');
  //   }

  //   // For a complete solution, you might want to use a Lesson library
  //   // that can extract specific pages. For now, we'll return the entire Lesson
  //   // and you can implement page extraction logic
    
  //   const fileBuffer = fs.readFileSync(pdf.filePath);
    
  //   // In a real implementation, you'd extract the specific page here
  //   // This requires a more advanced Lesson library like pdf-lib or pdfjs
    
  //   return fileBuffer;
  // }

  async getAllPdfs(): Promise<Lesson[]> {
    return await this.lesson.find({
      order: { createdAt: 'DESC' },
    });
  }

  async deletePdf(id: number): Promise<void> {
    const pdf = await this.getPdfById(id);
    
    // Delete file from filesystem
    if (fs.existsSync(pdf.filePath)) {
      fs.unlinkSync(pdf.filePath);
    }
    
    await this.lesson.delete(id);
  }

  // async getPdfById(id: string): Promise<Lesson> {
  //   const pdf = await this.lesson.findOne({ where: { id } });
  //   if (!pdf) {
  //     throw new NotFoundException('Lesson not found');
  //   }
  //   return pdf;
  // }

  // async getPdfPage(id: string, pageNumber: number): Promise<Buffer> {
  //   const pdf = await this.getPdfById(id);
    
  //   if (pageNumber < 1 || pageNumber > pdf.totalPages) {
  //     throw new NotFoundException('Page number out of range');
  //   }

  //   // Read the original Lesson file
  //   const dataBuffer = fs.readFileSync(pdf.filePath);
  //   const pdfDoc = await PDFDocument.load(dataBuffer);
    
  //   // Create a new Lesson document with only the requested page
  //   const newPdfDoc = await PDFDocument.create();
  //   const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [pageNumber - 1]);
  //   newPdfDoc.addPage(copiedPage);
    
  //   // Save the new Lesson to a buffer
  //   const pdfBytes = await newPdfDoc.save();
  //   return Buffer.from(pdfBytes);
  // }
  // recharge.service.ts
  generateCode(): string {
    return randomBytes(6).toString('hex').toUpperCase();
  }


  
async payWithCode(id: number, code: string, courseId: number) {
  const courseCode = await this.Repository.findOne({ 
    where: { 
      student_id: { id }, 
      code, 
      id: courseId 
    },
    relations: ['student_id'] 
  });

  if (!courseCode) {
    throw new NotFoundException('wrong code');
  }
  
  if (courseCode.isUsed) {
    throw new BadRequestException('course already purchased');
  }

  const coursePrice = await this.getCoursePrice(courseId);
  
  const student = courseCode.student_id;
  if (student.walletBalance < coursePrice) {
    throw new BadRequestException('not enoughh balance');
  }

  student.walletBalance -= coursePrice;
  await this.Repository2.save(student);

  await this.Repository2.save({ 
    id: id, 
    courseId: courseId,
    purchaseDate: new Date(),
    amountPaid: coursePrice
  });

  courseCode.isUsed = true;
  await this.Repository.save(courseCode);

  return { 
    message: 'your payment success', 
    courseId: courseId,
    remainingBalance: student.balance,
    amountPaid: coursePrice
  };
}

private async getCoursePrice(courseId: number): Promise<number> {
  const course = await this.Repository.findOne({
    where: { id: courseId },
    select: ['price']
  });
  
  if (!course) {
    throw new NotFoundException('الكورس غير موجود');
  }
  
  return course.price;
}
  async generatesCode(id: number) {
    const code = randomBytes(4).toString('hex').toUpperCase();    const newCode = this.Repository.update({id,},{
      code,
      isUsed:false
    });

    return await newCode
  }

async generateCard(
  id:number
) {
  const code = randomBytes(6).toString('hex').toUpperCase();

  const card =await this.Repository.findOne({
 where:{id}  
  });

  await this.Repository.update({id},{ code:code,
    amount: 10,
    isUsed: false,});

  return {
    message: 'Recharge card updated successfully',
    code: card.code,
    amount: card.amount,
  };
}














































async addToCart(userId: number, courseId: number) {
  const user = await this.Repository2.findOne({
    where: { id: userId },
    relations: ['courses'],
  });

  if (!user) throw new ConflictException('User does not exist');

  const course = await this.Repository.findOne({
    where: { id: courseId },
  });

  if (!course) throw new ConflictException('course does not exist');

  const alreadyOwned = user.courses.some(a => a.id === courseId);
  if (alreadyOwned) {
    throw new ConflictException('User already owns this course');
  }

  const existingCartItem = await this.cartRepo.findOne({
    where: {
      student: { id: userId },
      course: { id: courseId },
    },
    relations: ['course'], 
  });

  if (existingCartItem) {
    throw new ConflictException('Item already in cart');
  }

  const newCartItem = this.cartRepo.create({
    student: user,        // 🟢 لسه بنخزن الـ student في الـ DB
    course: course,
  });

  const savedItem = await this.cartRepo.save(newCartItem);
// console.log(savedItem);

  return {
    success: true,
    message: 'course added to cart successfully',
    cartItem: {
      course: {
        id: savedItem.course.id,
        price: savedItem.course.price,
      },
    },
  };
}







async useRechargeCard(dto: RechargeDto, userId: number) {
  const card = await this.Repository2.findOne({ where: { code: dto.code } });
  if (!card) throw new BadRequestException('wrong card');
  if (card.isUsed) throw new BadRequestException('card already used');

  const user = await this.Repository2.findOne({ where: { id: userId } });
  if (!user) throw new BadRequestException('user not found');

  user.walletBalance += card.walletBalance;
  await this.Repository2.save(user);

  card.isUsed = true;
  await this.Repository2.save(card);

  return {
    message: 'wallet charged successfully',
    balance: user.walletBalance,
  };
}

// async buyCourseWithCard(userId: number, courseId: number, code: string) {

//     const course = await this.Repository.findOneBy({ id: courseId });
//     if (!course) throw new NotFoundException('Course not found');

 
//     const card = await this.Repository.findOneBy({ code });
//     if (!card) throw new NotFoundException('Invalid card');
//     if (card.used) throw new BadRequestException('Card already used');
//     if (card.amount < course.price)
//       throw new BadRequestException('Card amount not enough for this course');

//     // 3. استخدم الكارت
//     card.used = true;
//     card.usedBy = userId;
//     card.usedAt = new Date();
//     await this.Repository.save(card);

//     // 4. سجل الطالب في الكورس
//     const userCourse = this.Repository.create({
//       students,
//       courseId,
//       enrolledAt: new Date(),
//     });
//     await this.Repository.save(userCourse);

//     return { message: 'Course purchased successfully', course };
//   }


}
