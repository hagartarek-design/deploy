import { BadRequestException, Body, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Section } from './entities/section.entity';
import { Repository } from 'typeorm';
import { Student } from 'src/students/entities/student.entity';
import { Cart } from 'src/cart/entities/cart.entity';

@Injectable()
export class SectionsService {
  constructor(
     @InjectRepository(Section) private readonly sectionrepository:Repository<Section>,
     @InjectRepository(Cart) private readonly cartrepository:Repository<Cart>,
     @InjectRepository(Student) private readonly Studentrepository:Repository<Student>
  //  ,  @InjectRepository(Section) private readonly sectionrepository:Repository<Section>
 ){

  }
 
 
async addToCart(userId: number, sectionid: number) {
  const user = await this.Studentrepository.findOne({
    where: { id: userId },
    relations: ['sections'],
  });

  if (!user) throw new ConflictException('User does not exist');

  const course = await this.sectionrepository.findOne({
    where: { id: sectionid },
  });

  if (!course) throw new ConflictException('course does not exist');

  const alreadyOwned = user.sections.some(a => a.id === sectionid);
  if (alreadyOwned) {
    throw new ConflictException('User already owns this course');
  }

  const existingCartItem = await this.cartrepository.findOne({
    where: {
      student: { id: userId },
      section: { id: sectionid },
    },
    relations: ['section'], 
  });

  if (existingCartItem) {
    throw new ConflictException('Item already in cart');
  }

  const newCartItem = this.cartrepository.create({
    student: user,        // 🟢 لسه بنخزن الـ student في الـ DB
    section: course,
  });

  const savedItem = await this.cartrepository.save(newCartItem);
// console.log(savedItem);

  return {
    success: true,
    message: 'course added to cart successfully',
    cartItem: {
      course: {
        id: savedItem.section.id,
        price: savedItem.section.price,
      },
    },
  };
}
 
  async payWithCode(id: number, code: string, sectionId: number) {
  const courseCode = await this.sectionrepository.findOne({ 
    where: { 
      student: { id }, 
      code, 
      id: sectionId 
    },
    relations: ['student'] 
  });

  if (!courseCode) {
    throw new NotFoundException('wrong code');
  }
  
  if (courseCode.isUsed) {
    throw new BadRequestException('course already purchased');
  }

  const coursePrice = await this.getSectionPrice(sectionId);
  
  const students = courseCode.student;
  if (students.walletBalance < coursePrice) {
    throw new BadRequestException('not enoughh balance');
  }

  students.walletBalance -= coursePrice;
  await this.Studentrepository.save(students);

  await this.Studentrepository.save({ 
    id: id, 
    sectionId: sectionId,
    purchaseDate: new Date(),
    amountPaid: coursePrice
  });

  courseCode.isUsed = true;
  await this.sectionrepository.save(courseCode);

  return { 
    message: 'your payment success', 
    sectionId: sectionId,
    remainingBalance: students.balance,
    amountPaid: coursePrice
  };
}
 private async getSectionPrice(sectionId: number): Promise<number> {
   const course = await this.sectionrepository.findOne({
     where: { id: sectionId },
     select: ['price']
   });
   
   if (!course) {
     throw new NotFoundException('الكورس غير موجود');
   }
   
   return course.price;
 }  async isEnrolled(id: number, sectionId: number) {
  // Check if the student is enrolled and if the section is used
  const section = await this.sectionrepository.findOne({
    where: { student: { id }, id: sectionId },
  });

  if (section && section.isUsed === true) {
    return true;  // Student is enrolled
  } else {
    return false;  // Student is not enrolled or section is not used
  }
}

  // create(createSectionDto: CreateSectionDto) {
  //   return 'This action adds a new section';
  // }

  // findAll() {
  //   return `This action returns all sections`;
  // }
async savesection(createSectionDto:CreateSectionDto,userId){

 

  // await this.sectionrepository.find();
return await this.sectionrepository.save(
  {course:createSectionDto.course,
    user:userId,description:
    createSectionDto.description
  ,name:createSectionDto.name,
  viewingWatching:createSectionDto.
  viewingWatching,price:
  createSectionDto.price

});
}

async mysections(){
  return await this.sectionrepository.find({where:{isUsed:true}})
}
  async withpaginatingsections(userId,offset?:number,limit?:number ,){
    return  await this.sectionrepository.find({where:{userId:userId},skip:offset,take:limit,})
    }
    async  allsections(userId){
      return await this.sectionrepository.find(userId)
    }
// async findAllSectionsbyuser(id:number ){
// return await this.sectionrepository.find({id:id})
// }
  // update(id: number, updateSectionDto: UpdateSectionDto) {
  //   return `This action updates a #${id} section`;
  // }

  remove(id: number ,userId) {
    return this.sectionrepository.delete({id,userId});
  }
}
