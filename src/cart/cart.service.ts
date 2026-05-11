import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';

import { Attachment } from 'src/attachments/entities/attachment.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Section } from 'src/sections/entities/section.entity';
import * as crypto from 'crypto';
import axios from 'axios';
import { Student } from 'src/students/entities/student.entity';
// import { SHA256 } from 'crypto-js';

@Injectable()
export class CartService {
  constructor( 
    @InjectRepository(Student)private readonly studentRepo:Repository<Student>,
    @InjectRepository(Cart) private readonly cartRepository:Repository<Cart>,
    @InjectRepository(Course) private readonly CourseRepository:Repository<Course>,
    @InjectRepository(Attachment) private readonly attachtRepository:Repository<Attachment>
    ,@InjectRepository(Section) private readonly SectionRepository:Repository<Section>
 ){}

private merchantCode = process.env.FAWRY_MERCHANT_CODE!;
private secret = process.env.FAWRY_SECURE_KEY!;
private endpoint = process.env.FAWRY_BASE_URL!; // base URL

 // private baseUrl=process.env.FAWRY_BASE_URL!;
// private merchantCode=process.env.FAWRY_MERCHANT_CODE!;
// private secureKey=process.env.FAWRY_SECURE_KEY!;
  create(createCartDto: CreateCartDto) {
    return 'This action adds a new cart';
  }
//   private sign (fields:string[]){
//     const str =fields.join('')+this.secureKey;
// return crypto.createHash('sha256').update(str).digest('hex')
//   }
// async createPayment(email:string,amount:number){

//   const id=`ORD-${Date.now()}
// 


private sign(fields: string[]) {
// تبسيط: استخدم التجميع وبناء هاش sha256
const str = fields.join('') + this.secret;
return crypto.createHash('sha256').update(str).digest('hex');
}



async recharge(merchantRef: string, amount: number, customerMobile?: string) {
const signature = this.sign([this.merchantCode, merchantRef, amount.toFixed(2)]);


const payload = {
merchantCode: this.merchantCode,
merchantRefNumber: merchantRef,
amount: Number(amount.toFixed(2)),
customerMobile: customerMobile || '',
description: 'Order payment',
signature,
};


// مثال endpoint افتراضي — عدّله بحسب الdocumentation الخاص بفوري
const url = `${this.endpoint}/Fawry/payments/charge`;
const res = await axios.post(url, payload);
return res.data;
}


// تحقق signature callback (مثال عام)
verifyCallbackSignature(payload: any, signatureFromFawry: string) {
// اعتمادًا على وثائق فوري: بنجمع بعض الحقول ثم نعمل هاش
const str = payload.merchantCode + payload.merchantRefNumber + payload.orderId + this.secret;
const local = crypto.createHash('sha256').update(str).digest('hex');
return local === signatureFromFawry;
}




async createPayment(merchantRef: string, amount: number, customerMobile?: string) {
  const paymentMethod = 'PAYATFAWRY';
  const customerProfileId = customerMobile || 'CUST-' + merchantRef;

  const chargeItems = [
    {
      itemId: 'COURSE-' + merchantRef,
      description: 'Physics course payment',
      price: Number(amount.toFixed(2)), 
      quantity: 1,
    },
  ];
const signatureString = `${this.merchantCode}${merchantRef}${customerProfileId}${paymentMethod}${amount}${this.secret}`;
const signature = crypto.createHash('SHA256').update(signatureString).digest('hex')
// console.log("🔹 Signature string:", `${this.merchantCode}${merchantRef}${customerProfileId}${paymentMethod}${amount}${this.secret}`);

  const payload = {
    merchantCode: this.merchantCode,
    merchantRefNum: merchantRef,
    customerProfileId,
    paymentMethod,
    amount: Number(amount.toFixed(2)), // number
    currencyCode: 'EGP',
    description: 'Course payment',
    customerMobile: customerMobile || '',
    signature,
    chargeItems,
  };

  // console.log('🟡 Fawry Payload:', payload);

  const url = `${this.endpoint}`;

  try {
    const res = await axios.post(url, payload, {
      headers: { 'Content-Type': 'application/json' },
    });
    // console.log('🟢 Fawry Response:', res.data);
    return res.data;
  } catch (error) {
    console.error('🔴 Fawry Error:', error.response?.data || error.message);
    throw new Error('Fawry API failed: ' + (error.response?.data?.message || error.message));
  }
}



// async createPayment(merchantRef: string, amount: number, customerMobile?: string) {
//   const paymentMethod = 'PAYATFAWRY';
//   const customerProfileId = customerMobile || 'CUST-' + merchantRef;

//   const chargeItems = [
//     {
//       itemId: 'COURSE-' + merchantRef,
//       description: 'Physics course payment',
//       price: Number(amount.toFixed(2)),
//       quantity: 1,
//     },
//   ];

//   const signatureString =
//     this.merchantCode +
//     merchantRef +
//     customerProfileId +
//     paymentMethod +
//     amount.toFixed(2) +
//     this.secret;

//   const signature = crypto.createHash('sha256').update(signatureString).digest('hex');

//   const payload = {
//     merchantCode: this.merchantCode,
//     merchantRefNum: merchantRef,
//     customerProfileId,
//     paymentMethod,
//     amount: Number(amount.toFixed(2)),
//     description: 'Course payment',
//     customerMobile: customerMobile || '',
//     signature,
//     chargeItems,
//   };

//   const url = `${this.endpoint}`;

//   try {
//     const res = await axios.post(url, payload, {
//       headers: { 'Content-Type': 'application/json' },
//     });
//     return res.data;
//   } catch (error) {
//     console.error('Fawry Error:', error.response?.data || error.message);
//     throw new Error('Fawry API failed: ' + (error.response?.data?.message || error.message));
//   }
// }


// async createPayment(merchantRef: string, amount: number, customerMobile?: string) {
//   const paymentMethod = 'PAYATFAWRY';
//   const customerProfileId = customerMobile || 'CUST-' + merchantRef;

//   const signatureString =
//     this.merchantCode +
//     merchantRef +
//     customerProfileId +
//     paymentMethod +
//     amount.toFixed(2) +
//     this.secret;

//   const signature = crypto.createHash('sha256').update(signatureString).digest('hex');

//   const payload = {
//     merchantCode: this.merchantCode,
//     merchantRefNum: merchantRef, // ✅ المفتاح الصحيح
//     customerProfileId,
//     paymentMethod,
//     amount: Number(amount.toFixed(2)),
//     description: 'Cart payment',
//     customerMobile: customerMobile || '',
//     signature,
//   };

//   const url = `${this.endpoint}/ECommerceWeb/Fawry/payments/charge`;

//   try {
//     const res = await axios.post(url, payload, {
//       headers: { 'Content-Type': 'application/json' },
//     });
//     return res.data;
//   } catch (error) {
//     console.error('Fawry Error:', error.response?.data || error.message);
//     throw new Error('Fawry API failed: ' + (error.response?.data?.message || error.message));
//   }
// }
// async lesson 

async completeCoursePurchase(courseId: number) {
  // const cart = await this.cartRepository.findOne({
  //   where: { id: cartId },
  //   relations: ['course'],
  // });

  // if (!cart) {
  //   throw new Error('Cart not found');
  // }

  const course = await this.CourseRepository.findOne({ where: { id: courseId } });

  if (!course) {
    throw new Error('Course not found');
  }

  const newAmount = Number(course.amount) - Number(course.price);
  course.amount = newAmount < 0 ? 0 : newAmount;

  if (course.amount === 0) {
    course.status = 'paid';
  }

  await this.CourseRepository.save(course);

  return {
    message: 'Course purchase completed successfully',
    remainingAmount: course.amount,
    status: course.status,
  };
}

// async createPayment(merchantRef: string, amount: number, customerMobile?: string,student_id?:number) {
//   const paymentMethod = 'PAYATFAWRY';
//   const student=await this.studentRepo.findOne({where:{id:student_id} })
//   // const customerProfileId = customerMobile || 'CUST-' + merchantRef;

//   const signatureString = 
//     this.merchantCode +
//     merchantRef +
//     student.id +
//     paymentMethod +
//     amount.toFixed(2) +
//     this.secret;

//   const signature = crypto.createHash('sha256').update(signatureString).digest('hex');

//   const payload = {
//     merchantCode: this.merchantCode,
//     merchantRefNumber: merchantRef,
//     customerProfileId:student.id,
//     paymentMethod,
//     amount: Number(amount.toFixed(2)),
//     description: 'Order payment',
//     customerMobile: customerMobile || '',
//     signature,
//   };

//   const url = `${this.endpoint}/ECommerceWeb/Fawry/payments/charge`;

//   try {
//     const res = await axios.post(url, payload, {
//       headers: { 'Content-Type': 'application/json' },
//     });
//     return res.data;
//   } catch (error) {
//     console.error('Fawry Error:', error.response?.data || error.message);
//     throw new Error('Fawry API failed: ' + (error.response?.data?.message || error.message));
//   }
// }

// async createPayment(merchantRef: string, amount: number, customerMobile?: string) {
// const signature = this.sign([this.merchantCode, merchantRef, amount.toFixed(2)]);


// const payload = {
// merchantCode: this.merchantCode,
// merchantRefNumber: merchantRef,
// amount: Number(amount.toFixed(2)),
// customerMobile: customerMobile || '',
// description: 'Order payment',
// signature,
// };


// const url = `${this.endpoint}/Fawry/payments/charge`;
// const res = await axios.post(url, payload);
// return res.data;
// }




// `;
//   const signature=crypto.createHash('sha256').update(
//     `${this.merchantCode}${id}${email}${amount.toFixed(2)}${this.secureKey}`
//   ).digest('hex');
//   const payload={
//     merchantCode:this.merchantCode,merchantRefNum:id,customerProfileId:email,
//     customerEmail:email,customerMobile:'01000000000',amount,currencyCode:'EGP',
//     description:'Test Product',signature,paymentMethod:"PAY_AT_FAWRY"
//   }
//   const response=await axios.post(`${this.baseUrl}/ECommerceWeb/Fawry/payments/charge`,payload)
// await this.CourseRepository.save({id:+id,email,amount,status :"PENDING"})
// return response.data;

// }


// async lessonaddtocart(){

// }

async attachfromcart( id:number){

  const attachment=this.cartRepository.findOne({where:{id:id}})
  if(!attachment)return new ConflictException("not found attachment")

  const deletecart=this.cartRepository.delete({id:id})

  return deletecart;
}
async findAll() {
  const data = await this.cartRepository.find({
    relations: ['attachment', 'course', 'section','lesson'],
  });

  const cleanedData = data.map((item) => ({
    ...item,
    course: item.course || null,
    attachment: item.attachment || null,
    section: item.section || null,
    lesson:item.lesson
  }));

  const attachment = await this.attachtRepository.find({ where: { isUsed: false } });
  const course = await this.CourseRepository.find({ where: { isUsed: false } });
  const section = await this.SectionRepository.find({ where: { isUsed: false } });

  const totalPrice = cleanedData.reduce((sum, e) => {
    const getPrice = (val: any): number => {
      if (Array.isArray(val)) {
        return val.reduce((s, item) => s + (Number(item?.price) || 0), 0);
      } else if (val && typeof val === 'object' && 'price' in val) {
        return Number((val as any).price) || 0;
      } else {
        return 0;
      }
    };

    const coursePrice = getPrice(e.course);
    const attachmentPrice = getPrice(e.attachment);
    const sectionPrice = getPrice(e.section);
    const lessonPrice = getPrice(e.lesson);

    return sum + coursePrice + attachmentPrice + sectionPrice+lessonPrice;
  }, 0);

  return {
    data: cleanedData,
   length: totalPrice,
  };
}


  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
