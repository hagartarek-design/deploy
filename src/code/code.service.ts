import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCodeDto } from './dto/create-code.dto';
import { UpdateCodeDto } from './dto/update-code.dto';
import { Code } from './entities/code.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/students/entities/student.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Repository } from 'typeorm';
import { randomBytes } from 'crypto';
import { Section } from 'src/sections/entities/section.entity';
import { Attachment } from 'src/attachments/entities/attachment.entity';
import { Cart } from 'src/cart/entities/cart.entity';

@Injectable()
export class CodeService {

  private  alreadyBought:boolean
 constructor(
    @InjectRepository(Code)
    private readonly cardRepo: Repository<Code>,
    @InjectRepository(Student)
    private readonly userRepo: Repository<Student>,
    @InjectRepository(Course)
    private readonly courseRepo: Repository<Course>,
    @InjectRepository(Section)
    private readonly sectionRepo: Repository<Section>,
    @InjectRepository(Attachment)
    private readonly attachmentRepo: Repository<Attachment>,
    @InjectRepository(Cart)
    private readonly cartRepo: Repository<Cart>,
  ) {}

  // 🟢 Generate cards
  async generateCards(amount: number, count: number) {
    const cards: Code[] = [];

    for (let i = 0; i < count; i++) {
      const rechargeCode = Math.random().toString(36).substring(2, 10).toUpperCase();
      const serial = 'SN-' + Math.random().toString(36).substring(2, 12).toUpperCase();

      const card = this.cardRepo.create({ rechargeCode, serial, amount });
      await this.cardRepo.save(card);
      cards.push(card);
    }

    return cards;
  }

  // async rechargeCard(rechargeCode: string, userId: number) {
  //   const card = await this.cardRepo.findOne({ where: { rechargeCode } });
  //   if (!card) throw new ConflictException('❌ الكارت غير صحيح');
  //   if (card.isUsed) throw new ConflictException('❌ الكارت مستخدم بالفعل');

  //   const user = await this.userRepo.findOne({ where: { id: userId } });
  //   if (!user) throw new ConflictException('❌ المستخدم غير موجود');

  //   user.usedCards = [...(user.usedCards || []), card.serial];
  //   await this.userRepo.save(user);

  //   card.isUsed = true;
  //   await this.cardRepo.save(card);

  //   return { success: true, serial: card.serial, amount: card.amount };
  // }


// async buyCourse(userId: number, courseId: number,// cardSerial: string

// ) {
//   const user = await this.userRepo.findOne({
//     where: { id: userId },
//     relations: ['courses'],
//   });
//   if (!user) throw new ConflictException('❌ المستخدم غير موجود');

//   const course = await this.courseRepo.findOne({ where: { id: courseId } });
//   if (!course) throw new ConflictException('❌ الكورس غير موجود');

//   const card = await this.cardRepo.findOne({ where: { serial: cardSerial } });
//   if (!card) throw new ConflictException('❌ الكارت غير موجود');

//   if (!user.usedCards?.includes(card.serial)) {
//     throw new ConflictException('❌ الكارت غير مربوط بالمستخدم');
//   }

//   if (card.amount < course.price) {
//     throw new ConflictException('❌ الرصيد غير كافي لشراء هذا الكورس');
//   }

//   const alreadyBought = user.courses.some(c => c.id === course.id);
//   if (alreadyBought) {
//     throw new ConflictException('⚠️ الكورس تم شراؤه بالفعل');
//   }

//   card.amount -= course.price;
//   await this.cardRepo.save(card);

//   user.courses.push(course);
//   await this.userRepo.save(user);

//   return {
//     success: true,
//     message: '✅ تم شراء الكورس بنجاح',
//     // course: course.title,
//     paid: course.price,
//     remainingBalance: card.amount,
//   };
// }\\\
 async codes(page=1,limit=9){
        const skip=(page-1)*limit;
      const codes=await this.cardRepo.find({skip,
    take: limit, where:{isUsed:true}})
return { message :'codes  returned successfully',codes}

    }
    
async rechargeCard(userId: number, rechargeCode: string, amount: number) {
  
  const card = await this.cardRepo.findOne({ where: { rechargeCode } });
  if (!card) throw new ConflictException('wrong card num');

  if (card.isUsed) throw new ConflictException('card already used');


  const user = await this.userRepo.findOne({ where: { id: userId } });
  if (!user) throw new ConflictException('user not found');


  user.balance += amount;
card.balance=user.balance;

  card.isUsed = true;
  card.amount = amount; 
  await this.cardRepo.save(card);
  await this.userRepo.save(user);

  return {
    success: true,
    message: 'recharged successfully✅',
    added: amount,
    totalBalance: user.balance,
    code: card.rechargeCode,
  };
}
async buyCourse(userId: number, courseId: number) {
  const user = await this.userRepo.findOne({
    where: { id: userId },
    relations: ['courses'],
  });
  if (!user) throw new ConflictException('user not exist');

  const course = await this.courseRepo.findOne({ where: { id: courseId } });
  if (!course) throw new ConflictException('course not found');

 
  const already = user.courses.some(c => c.id === course.id);
  if (already) throw new ConflictException('course already exist');

 
  if (user.balance < course.price) {
    throw new ConflictException('no enough balance');
  }

  user.balance -= course.price;

  
  user.courses.push(course);

  await this.userRepo.save(user);

  return {
    success: true,
    message: 'course successfully paid ',
    // course: course.title,
    paid: course.price,
    remainingBalance: user.balance,
  };
}

async buySection(userId: number, sectionId: number) {
  const user = await this.userRepo.findOne({
    where: { id: userId },
    relations: ['sections'],
  });
  if (!user) throw new ConflictException('user not exist');

  const sections = await this.sectionRepo.findOne({ where: { id: sectionId } });
  if (!sections) throw new ConflictException('sections not found');

 
  const already  = user.sections.some(a => a.id === sections.id);
  if (already) throw new ConflictException('sections already exist');

 
  if (user.balance < sections.price) {
    throw new ConflictException('no enough balance');
  }

  user.balance -= sections.price;

    sections.isUsed = true;

  await this.userRepo.save(user);
await this.sectionRepo.save(sections)
if(sections.isUsed==true){
  return new ConflictException("already bought")
}
  return {
    success: true,
    message: 'course successfully paid ',
    // course: course.title,
    paid: sections.price,
    remainingBalance: user.balance,isUsed:sections.isUsed
  };
}

async clearcart(userId:number,){
const user =await this.userRepo.findOne({ where:{id:userId} });
if(!user)return new ConflictException('user not exist')
return await this.cartRepo.clear();
}

async buySheet(userId: number) {

  const user = await this.userRepo.findOne({
    where: { id: userId },
    relations: ['attachments'],
  });

  if (!user) throw new ConflictException('User does not exist');

  const cartItems = await this.cartRepo.find({
    where: { student: { id: userId } },
    relations: ['attachment'],
  });

  if (cartItems.length === 0) {
    throw new ConflictException('Cart is empty');
  }

  const alreadyOwnedIds = user.attachments.map(a => a.id);

  // Filter out already owned attachments
  const attachmentsToBuy = cartItems
    .map(item => item.attachment)
    .filter(attachment => !alreadyOwnedIds.includes(attachment.id));

  if (attachmentsToBuy.length === 0) {
    throw new ConflictException('All items in cart are already owned');
  }


  const totalCost = attachmentsToBuy.reduce((sum, a) => sum + a.price, 0);

  if (user.walletBalance < totalCost) {
    throw new ConflictException('Not enough wallet balance');
  }

  // Deduct balance
  user.walletBalance -= totalCost;

  // Mark attachments as used and add to user's owned list
 
  await this.userRepo.save(user);
  await this.cartRepo.clear(); // or delete cart items for that user only

  return {
    success: true,
    message: 'All attachments successfully purchased',
    paid: totalCost,
    remainingBalance: user.walletBalance,
    attachmentsBought: attachmentsToBuy.map(a => ({
      id: a.id,
      // title: a.title,
      price: a.price,
    })),
  };
}


// async buyCourse(userId: number, courseId: number) {
//   // 1) Check user
//   const user = await this.userRepo.findOne({
//     where: { id: userId },
//     relations: ['courses'],
//   });
//   if (!user) throw new ConflictException('❌ المستخدم غير موجود');

//   // 2) Check course
//   const course = await this.courseRepo.findOne({ where: { id: courseId } });
//   if (!course) throw  new ConflictException('❌ الكورس غير موجود');

//   // 3) Prevent duplicate purchases
// this.   alreadyBought = user.courses.some(c => c.id === course.id);
//   if (this.alreadyBought) {
//  console.log(this.alreadyBought);
//     throw new ConflictException('⚠️ الكورس تم شراؤه بالفعل');
//   }

//   // 4) Add course to user
//   user.courses.push(course);
//   await this.userRepo.save(user);

//   return {
//     success: true,
//     message: '✅ تم شراء الكورس بنجاح',
//     // course: course.title,
//     paid: course.price,
//   };
// }
// async course(courseId:number){
//   console.log(this.alreadyBought);
  
// return await this.alreadyBought;
// }

create(createCodeDto:CreateCodeDto){
    return 'This action adds a new code';
  }

  findAll() {
    return `This action returns all code`;
  }

  findOne(id: number) {
    return `This action returns a #${id} code`;
  }

  update(id: number, updateCodeDto: UpdateCodeDto) {
    return `This action updates a #${id} code`;
  }

  remove(id: number) {
    return `This action removes a #${id} code`;
  }
}
