import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAttachmentDto } from './dto/create-attachment.dto';
import { UpdateAttachmentDto } from './dto/update-attachment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Attachment } from './entities/attachment.entity';
import { Repository } from 'typeorm';
import { Course } from 'src/courses/entities/course.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { Student } from 'src/students/entities/student.entity';
import { Lesson } from 'src/teacher/lesson/entities/lesson.entity';

@Injectable()
export class AttachmentsService {
  constructor(    
    @InjectRepository(Attachment) private readonly attatchRepository:Repository<Attachment>,
    @InjectRepository(Course) private readonly courseRepository:Repository<Course>,
    @InjectRepository(Cart) private readonly cartRepository:Repository<Cart>,
    @InjectRepository(Student) private readonly studentRepository:Repository<Student>,
    @InjectRepository(Lesson) private readonly lessonRepository:Repository<Lesson>,
    // @InjectRepository()

){}
create(createAttachmentDto: CreateAttachmentDto) {
  const newAttachment = this.attatchRepository.create(createAttachmentDto);
  return this.attatchRepository.save(newAttachment);
}

async addlessontocart(userId:number,lessonId:number){
const user=await this.studentRepository.findOne({where:{id:userId},relations:['lesson']})
const lesson =await this.lessonRepository.findOne({where:{id:lessonId}})
if(!lesson){
  return new ConflictException('no lesson found')}
  const alreadyOwned = user.lesson.some(a => a.id === lessonId);
  if (alreadyOwned) {
    throw new ConflictException('User already owns this lesson');}
  const existingCartItem = await this.cartRepository.findOne({
    where: {
      student: { id: userId },
      lesson: { id: lessonId },
    },
    relations: ['lesson'], 
  });

  if (existingCartItem) {
    throw new ConflictException('Item already in cart');
  }

  const newCartItem = this.cartRepository.create({
    student: user,       
    lesson: lesson,
  });

  const savedItem = await this.cartRepository.save(newCartItem);
// console.log(savedItem);

  return {
    success: true,
    message: 'lesson added to cart successfully',
    cartItem: {
      lesson: {
        id: savedItem.lesson.id,
        price: savedItem.lesson.price,
      },
    },
  };

}
async addToCart(userId: number, attachmentId: number) {
  const user = await this.studentRepository.findOne({
    where: { id: userId },
    relations: ['attachments'],
  });

  if (!user) throw new ConflictException('User does not exist');

  const attachment = await this.attatchRepository.findOne({
    where: { id: attachmentId },
  });

  if (!attachment) throw new ConflictException('Attachment does not exist');

  const alreadyOwned = user.attachments.some(a => a.id === attachmentId);
  if (alreadyOwned) {
    throw new ConflictException('User already owns this attachment');
  }

  const existingCartItem = await this.cartRepository.findOne({
    where: {
      student: { id: userId },
      attachment: { id: attachmentId },
    },
    relations: ['attachment'], // 🟢 نجيب بس الـ attachment
  });

  if (existingCartItem) {
    throw new ConflictException('Item already in cart');
  }

  const newCartItem = this.cartRepository.create({
    student: user,        // 🟢 لسه بنخزن الـ student في الـ DB
    attachment: attachment,
  });

  const savedItem = await this.cartRepository.save(newCartItem);
// console.log(savedItem);

  return {
    success: true,
    message: 'Attachment added to cart successfully',
    cartItem: {
      attachment: {
        id: savedItem.attachment.id,
        price: savedItem.attachment.price,
      },
    },
  };
}




// async addToCart(studentId: number, attachmentId: number) {
//   const attachment = await this.attatchRepository.findOne({ where: { id: attachmentId } });
//  const user = await this.studentRepository.findOne({
//     where: { id: studentId },
//     relations: ['attachments'],
//   });
  
//   if (!attachment) return new NotFoundException('Attachment not found');

//   // Optional: don't mark as used until purchase
//   // attachment.isUsed = true;
//   // await this.attatchRepository.save(attachment);

//   const cartItem = this.cartRepository.create({
//     attachment: attachment,
//     student: {id:studentId}, // Add the user info here!
//   });

//   return await this.cartRepository.save(cartItem);
// }
async findused(){
  const used=await this.attatchRepository.find({where:{isUsed:true}})
  if(!used)return new ConflictException('not found ')
    return used;
}
async findunused(){
  const used=await this.attatchRepository.find({where:{isUsed:false}})
  if(!used)return new ConflictException('not found ')
    return used;
}
 async findAll(status?:string) {
  const course=await this.attatchRepository.find({where:{status:status},relations:["assignments","exam"]});
  const courses=  course.map((e)=>({...e,assignmentCount:e.assignments?e.assignments.length:0
,examCount:e.exam?e.exam.length:0,
totalExamAssignment:(e.assignments?e.assignments.length:0)+(e.exam?e.exam.length:0)
  }));
  const course2=await this.attatchRepository.find({where:{status:status}});
    return {courses}
  }

  
//   async findAll(status?: string) {
//   const attachments = await this.attatchRepository.find({
//     where: { status },
//     relations: ["assignments"], // make sure assignments are loaded
//   });

//   // Map each attachment to include the count of assignments
//   const result = attachments.map(att => ({
//     ...att,
//     assignmentCount: att.assignments ? att.assignments.length : 0,
//   }));

//   return { attachments: result };
// }

 async findbyonline() {
    return await this.attatchRepository.find();
  }
 async findbyoffline() {
    return await this.attatchRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} attachment`;
  }

  update(id: number, updateAttachmentDto: UpdateAttachmentDto) {
    return `This action updates a #${id} attachment`;
  }

  remove(id: number) {
    return `This action removes a #${id} attachment`;
  }
}
