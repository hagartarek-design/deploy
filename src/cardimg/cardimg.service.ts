import { Injectable } from '@nestjs/common';
import { CreateCardimgDto } from './dto/create-cardimg.dto';
import { UpdateCardimgDto } from './dto/update-cardimg.dto';

@Injectable()
export class CardimgService {
  create(createCardimgDto: CreateCardimgDto) {
    return 'This action adds a new cardimg';
  }

  findAll() {
    return `This action returns all cardimg`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cardimg`;
  }

  update(id: number, updateCardimgDto: UpdateCardimgDto) {
    return `This action updates a #${id} cardimg`;
  }

  remove(id: number) {
    return `This action removes a #${id} cardimg`;
  }
}
