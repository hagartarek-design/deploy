import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, UseGuards } from '@nestjs/common';
import { CodeService } from './code.service';
import { CreateCodeDto } from './dto/create-code.dto';
import { UpdateCodeDto } from './dto/update-code.dto';
import { Request } from 'express';
import { Public } from 'common/decorator/public.decorator';
import { AuthGuard } from 'common/Gaurds/auth.guard';
// import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
@UseGuards(AuthGuard)
@Controller('attachments')
@Controller('code')
export class CodeController {
  constructor(private readonly codeService: CodeService) {}

  // @Post()
  // create(@Body() createCodeDto: CreateCodeDto) {
  //   return this.codeService.create(createCodeDto);
  // }

  // @Get()
  // findAll() {
  //   return this.codeService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.codeService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCodeDto: UpdateCodeDto) {
  //   return this.codeService.update(+id, updateCodeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.codeService.remove(+id);
  // }
    @Post('generate')
  async generate(@Body() body: { amount: number; count: number }) {
    return this.codeService.generateCards(body.amount, body.count);
  }
  
  @Get('withpag')
async  codes(@Query('page') page?:number
,@Query('limit') limit?:number,){
return  await this.codeService.codes(page,limit)
}
  @Patch('recharge')
  async recharge(@Req() req:Request,@Body() body: { rechargeCode: string,amount:number } ,) {
    return this.codeService.rechargeCard( req['user'].userId,body.rechargeCode,body.amount);
  }

  @Patch('buy')
  async buy(@Req() req:Request, @Body() body: {  courseId: number;// cardSerial: string

   }) {
    return this.codeService.buyCourse(req['user'].id, body.courseId,// body.cardSerial

    );
  }
  @Patch('buy/sections')
  async buySection(@Req() req:Request, @Body() body: {  sectionId: number;// cardSerial: string

   }) {
    return this.codeService.buySection(req['user'].id, body.sectionId,// body.cardSerial

    );
  }
  @Patch('buy/buySheet')
  async buySheet(@Req() req:Request,) {
    return this.codeService.buySheet(req['user'].id,// body.cardSerial

    );
  }

  @Patch('buy/clearcart')
  async clearcart(@Req() req:Request,) {
    return this.codeService.clearcart(req['user'].id,// body.cardSerial

    );
  }

  // @Public()
  // @Get('course')
  // async course(// cardSerial: string

  //  ) {
  //   return this.codeService.course(// body.cardSerial

  //   );
  // }
}
