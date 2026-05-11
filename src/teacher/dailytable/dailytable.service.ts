import { Body, Injectable } from '@nestjs/common';
import { CreateDailytableDto } from './dto/create-dailytable.dto';
import { UpdateDailytableDto } from './dto/update-dailytable.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Dailytable } from './entities/dailytable.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DailytableService {
  constructor(@InjectRepository(Dailytable) private readonly Repository:Repository<Dailytable>){}
  create(createDailytableDto: CreateDailytableDto) {
    return 'This action adds a new dailytable';
  }

  findAll(coursetabledate?:Date) {
    return this.Repository.findOne({where:{course_info:{coursetabledate:coursetabledate}},relations:['course_info']})
  }

  findOne(id: number) {
    return `This action returns a #${id} dailytable`;
  }

  update(id: number, updateDailytableDto: UpdateDailytableDto) {
    return `This action updates a #${id} dailytable`;
  }

  remove(id: number) {
    return `This action removes a #${id} dailytable`;
  }
}
