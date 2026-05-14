import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseGuards } from '@nestjs/common';
import { AttachmentsService } from './attachments.service';
import { CreateAttachmentDto } from './dto/create-attachment.dto';
import { UpdateAttachmentDto } from './dto/update-attachment.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/common/Gaurds/auth.guard';
@UseGuards(AuthGuard)
@Controller('attachments')
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}
@Post('addtocart/:id')
async addToCart(@Req() req:Request,@Param('id') id:number,){
return await this.attachmentsService.addToCart(req['student'].id,id);
}
@Post('addlessontocart/:id')
async addlessontocart(
@Req()req:Request,
@Param('id') id:number
){
  return await this.attachmentsService.addlessontocart(req['student'].id,id);
}
@Get('allusedattach')
async findused(){
  return await this.attachmentsService.findused();
}
@Get('allunusedattach')
async findunused(){
  return await this.attachmentsService.findunused();
}
  @Post()
 async create(@Body() createAttachmentDto: CreateAttachmentDto) {
  // console.log(createAttachmentDto);
  // console.log(await this.attachmentsService.create(createAttachmentDto));
  
    return await this.attachmentsService.create(createAttachmentDto);

  }

  @Get()
  findAll(@Query("status") status?:string) {
    return this.attachmentsService.findAll(status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attachmentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAttachmentDto: UpdateAttachmentDto) {
    return this.attachmentsService.update(+id, updateAttachmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attachmentsService.remove(+id);
  }
}
