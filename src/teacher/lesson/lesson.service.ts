import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from './entities/lesson.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseInfo } from 'src/course_info/entities/course_info.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import {Content} from 'src/content/entities/content.entity'
 @Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private readonly  lessons:Repository<Lesson>,
    @InjectRepository(CourseInfo) private readonly  courseInfo:Repository<CourseInfo>
,@InjectRepository(Cart) private readonly cartRepo:Repository<Cart>
,@InjectRepository(Content) private readonly contentRepo:Repository<Content>
// ,@InjectRepository(Cart) private readonly cartRepo:Repository<Cart>
  ){
  }
  async addlesson(): Promise<Lesson> {
    const lastLesson = await this.lessons.find({
      order: { course_num: 'DESC' },
      take: 1,
    });
  
    const lastNum = lastLesson[0]?.course_num ?? 0;
    const nextNum = lastNum + 1;
     
    const createLesson = this.lessons.create({
      name: 'اسم الدرس',
      course_num: nextNum,
    });
  
    return await this.lessons.save(createLesson);
  }
  
async  create(createLessonDto: CreateLessonDto) {
const lesson= await this .lessons.find()
const lessonsques=await lesson.map((value)=>value.question)

if(lessonsques.includes(createLessonDto.question)){

return {success:false,message:"question already exist"} 
}
const lessons2=new Lesson();
return await this.lessons.save({
  question_name:lesson[0].question_name  ,
  name:lesson[0].name  ,
  type:createLessonDto.type
  ,question:createLessonDto.question
  ,answer:createLessonDto.answer});


  }
async getLessonQuestions(id:number,page=1,limit=9){
  const skip=(page-1)*limit;
  const getlessons=await this.lessons.findOne({where:{id:id},
    select:{questions:true },relations:['questions'] 
  });
  getlessons.questions =getlessons.questions ?.slice (skip,skip+limit)
  return await getlessons;
}
 async  findAll() {
    return await this .lessons.find()
    // return this.;
  }

 async  deletelesson(id:number) {
    return await this .lessons.delete(id)
    // return this.;
  }

// services/cart.service.ts


  async getOrCreateCart(userId: number): Promise<Cart> {
    let cart = await this.cartRepo.findOne({
      where: { student:{id:userId },
       },   relations: ['items', 'items.lesson'],
    });

    if (!cart) {
      cart = this.cartRepo.create({id: userId, });
      cart = await this.cartRepo.save(cart);
    }

    return cart;
  }


  // async addLessonsFromCourseToCart(userId: string, courseId: string): Promise<Cart> {
  //   const cart = await this.getOrCreateCart(userId);

  //   // Get all lessons from the specified course
  //   const lessons = await this.lessonRepository.find({
  //     where: {
  //       courseId,
  //       isActive: true,
  //     },
  //   });

  //   if (lessons.length === 0) {
  //     throw new NotFoundException('No active lessons found for this course');
  //   }

  //   // Remove existing items from this course to avoid duplicates
  //   const existingLessonIds = lessons.map(lesson => lesson.id);
  //   await this.cartItemRepository
  //     .createQueryBuilder()
  //     .delete()
  //     .where('cartId = :cartId AND lessonId IN (:...lessonIds)', {
  //       cartId: cart.id,
  //       lessonIds: existingLessonIds,
  //     })
  //     .execute();

  //   // Create cart items for course lessons
  //   const cartItems = lessons.map(lesson =>
  //     this.cartItemRepository.create({
  //       cartId: cart.id,
  //       lessonId: lesson.id,
  //       price: lesson.price,
  //     })
  //   );

  //   // Save all cart items
  //   await this.cartItemRepository.save(cartItems);

  //   // Calculate total for the course lessons
  //   const courseTotal = lessons.reduce((sum, lesson) => sum + parseFloat(lesson.price.toString()), 0);

  //   // Get current cart total from existing items not in this course
  //   const existingItems = await this.cartItemRepository.find({
  //     where: { cartId: cart.id },
  //   });

  //   const existingTotal = existingItems.reduce((sum, item) => sum + parseFloat(item.price.toString()), 0);
  //   const newTotal = existingTotal + courseTotal;

  //   // Update cart total
  //   await this.cartRepo.update(cart.id, { total: newTotal });

  //   return this.cartRepo.findOne({
  //     where: { id: cart.id },
  //     relations: ['items', 'items.lesson'],
  //   });
  // }

  // async getCart(userId: string): Promise<Cart> {
  //   return this.getOrCreateCart(userId);
  // }

//   async clearCart(userId: string): Promise<void> {
//     const cart = await this.getOrCreateCart(userId);
//     await this.cartItemRepository.delete({ cartId: cart.id });
//     await this.cartRepo.update(cart.id, { total: 0 });
//   }

async getSolvedQuestionsPercentBySection(sectionId: number) {
  const lessons = await this.lessons
    .createQueryBuilder('lesson')
    .leftJoinAndSelect('lesson.content', 'content')
    .leftJoinAndSelect('lesson.questions', 'questions')
    .where('lesson.sectionId = :sectionId', { sectionId })
    .andWhere('content.title = :title', { title: 'واجبات و امتحنات' })
    .getMany();

  if (!lessons.length) return 0;

  const allQuestions = lessons.flatMap(lesson => lesson.questions || []);

  if (!allQuestions.length) return 0;

  const solvedCount = allQuestions.filter(q => q.solved).length;

  const percent = Math.round((solvedCount / allQuestions.length) * 100);

  return {percent}; 
}


async addalllessonstocart(sectionId:number) {
  // Get all lessons
  const lessons = await this.lessons.find({where:{section:{id:sectionId}}});

  // Map each lesson to a cart item entity
  const cartItems = lessons.map((lesson) =>
    this.cartRepo.create({
  // section:{ isUsed:true},
      lesson: { id: lesson.id },
      // price: lesson.price,
    })
  );

  // Save all new cart items in one go
  await this.cartRepo.save(cartItems);

  // Return the saved items
  return cartItems;

  }
async lessontype(title:string,id:number,sectionId:number){
const course= await this.courseInfo.find({where:{
students:{id},section:{ id:sectionId, lesson:{  content:{ title:title},}},
 },
 
relations:['section.lesson.content']
}) 
// const percent=await course.map((e)=>e.section.map(e=>))
// console.log (percent);
return {course,}
} 
  findOne(id: number) {
    return `This action returns a #${id} lesson`;
  }

  update(id: number, updateLessonDto: UpdateLessonDto) {
    return `This action updates a #${id} lesson`;
  }

  remove(id: number) {
    return `This action removes a #${id} lesson`;
  }

}
