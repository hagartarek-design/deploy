import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseGuards } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/common/Gaurds/auth.guard';
// import { Req } from 'express';
@UseGuards(AuthGuard)
@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}



  @Post()
  savesection(@Body() createSectionDto: CreateSectionDto,@Req () req) {
    return this.sectionsService.savesection(createSectionDto,req.user.id );
  }
  @Get()
  async withpaginatingsections(
    @Req() req,
    @Query() paginationDto?: UpdateSectionDto,
  ) {
    const { page, limit } = paginationDto;
    
    if (page && limit) {
      const offset = (page - 1) * limit;
      return this.sectionsService.withpaginatingsections(req['user'].id, offset, limit);
    } else {
      return this.sectionsService.allsections(req.user.id);
    }
  }
  @Get('allsections')
  allsections(@Req() req){
return this.sectionsService.allsections(req.user.id);
  }
  @Get('/mysections')
async  mysections(){
    return await this.sectionsService.mysections();
  }

@Post('addtocart/:id')
async addToCart(@Req() req:Request,@Param('id') id:number,){
return await this.sectionsService.addToCart(req['user'].id,id);
}



@Get('/isEnrolled/:sectionId')
async isEnrolled (@Req() req:Request, @Param('sectionId') sectionId: number) {
  const result = await this.sectionsService.isEnrolled(req['user'].id, sectionId);
  return { enrolled: result };
}
 @Patch('/pay-with-code/charge')
    async payWithCode(@Req() req:Request,@Body('code') code: string ,@Query('sectionId') sectionId:number) {
      // console.log(req['user'].id);
      
      return await this.sectionsService.payWithCode(req['user'].id, code,sectionId);
    }

  // @Get()
  // findAll() {
  //   return this.sectionsService.findAll();
  // }



  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSectionDto: UpdateSectionDto) {
  //   return this.sectionsService.update(+id, updateSectionDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.sectionsService.remove(+id,req.user.id);
  }
}
