import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DailytableService } from './dailytable.service';
import { CreateDailytableDto } from './dto/create-dailytable.dto';
import { UpdateDailytableDto } from './dto/update-dailytable.dto';

@Controller('dailytable')
export class DailytableController {
  constructor(private readonly dailytableService: DailytableService) {}

  @Post()
  create(@Body() createDailytableDto: CreateDailytableDto) {
    return this.dailytableService.create(createDailytableDto);
  }

  @Get()
  findAll(@Query('coursetabledate') coursetabledate?:Date) {
    return this.dailytableService.findAll(coursetabledate);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dailytableService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDailytableDto: UpdateDailytableDto) {
    return this.dailytableService.update(+id, updateDailytableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dailytableService.remove(+id);
  }
}
