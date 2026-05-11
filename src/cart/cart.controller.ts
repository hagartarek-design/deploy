import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from 'src/courses/entities/course.entity';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService,

    @InjectRepository(Course) private readonly coursesrepo:Repository<Course>
  ) {}
// @Patch('create-order')
// async createOrder(@Body() body: { amount: number; mobile?: string },@Req() req:Request) {
// const merchantRef = 'order-' + Date.now();
// const order = this.coursesrepo.create({ merchantRef, amount: body.amount, status: 'pending' ,student_id:{id:req['student'].id}});
// await this.coursesrepo.save(order);
// const fawryResp = await this.cartService.createPayment(merchantRef, body.amount, body.mobile,req['student'].id);
// return { order, fawry: fawryResp };
// }


// Webhook endpoint: فوري بتبعت هنا إشعارات الدفع
// @Post('callback')
// async fawryCallback(@Req() req) {
// const payload = req.body;
// // افترض أن payload يحتوي على merchantRefNumber و orderStatus و orderId
// const merchantRef = payload.merchantRefNumber;
// const orderId = payload.orderId;
// const status = payload.orderStatus; // مثال
// const signature = req.headers['x-fawry-signature'] || '';


// // تحقق التوقيع إن أردت
// if (!this.fawry.verifyCallbackSignature(payload, signature)) throw new Error('Invalid signature');


// const order = await this.coursesrepo.findOne({ where: { merchantRef } });
// if (!order) return { success: false };


// if (status === 'PAID' || status === 'Success') {
// order.status = 'paid';
// order.fawryRef = orderId;
// await this.coursesrepo.save(order);
// } else {
// order.status = 'failed';
// await this.coursesrepo.save(order);
// }


// return { success: true };
// }
@Post('complete-course-purchase')
async completeCoursePurchase(
  @Body() body: {  courseId: number },
) {
  return this.cartService.completeCoursePurchase( body.courseId);
}











@Post('create-recharge')
async createRecharge(@Body() body: { userId: string; amount: number; mobile?: string }) {
const merchantRef = 'recharge-' + Date.now();


const fawryResp = await this.cartService.recharge(merchantRef, body.amount, body.mobile);

return { merchantRef, fawry: fawryResp };
}


@Post('pay-cart')
async payCart(@Body() body: { courseId: number; mobile: string }) {
  const course = await this.coursesrepo.findOne({
    where: { id: body.courseId },
  });

  if (!course) throw new Error('course not found');

  const merchantRef = 'course-' + Date.now();
  course.merchantRef = merchantRef;
  course.status = 'pending';
  await this.coursesrepo.save(course);

  const fawryResp = await this.cartService.createPayment(
    merchantRef,
    course.amount,
    body.mobile,
  );

  // نحفظ رقم العملية اللي رجع من فوري
  if (fawryResp?.fawryRefNumber) {
    course.fawryRefNumber = fawryResp.fawryRefNumber;
    await this.coursesrepo.save(course);
  }

  return { course, fawry: fawryResp };
}

  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @Get()
  findAll() {
    return this.cartService.findAll();
  }
  @Delete('/:id')
  attachfromcart(  @Param('id') id:number) {
    return this.cartService.attachfromcart(id);
  }
// @Post('create-order')
// async createOrder(@Body() body: { amount: number; userId: string; mobile?: string }) {
// const merchantRef = 'order-' + Date.now();
// const order = await this.coursesrepo.create({ merchantRef, amount: body.amount, status: 'pending' });
// await this.coursesrepo.save(order);


// const fawryResp = await this.cartService.createPayment(merchantRef, body.amount, body.mobile);


// // response from fawry might include reference number & instructions
// return { order, fawry: fawryResp };
// }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
