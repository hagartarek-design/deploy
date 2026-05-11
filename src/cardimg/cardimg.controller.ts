import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CardimgService } from './cardimg.service';
import { CreateCardimgDto } from './dto/create-cardimg.dto';
import { UpdateCardimgDto } from './dto/update-cardimg.dto';

@Controller('cardimg')
export class CardimgController {
  constructor(private readonly cardimgService: CardimgService) {}

  @Post()
  create(@Body() createCardimgDto: CreateCardimgDto) {
    return this.cardimgService.create(createCardimgDto);
  }

  @Get()
  findAll() {
    return this.cardimgService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardimgService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardimgDto: UpdateCardimgDto) {
    return this.cardimgService.update(+id, updateCardimgDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardimgService.remove(+id);
  }
}
