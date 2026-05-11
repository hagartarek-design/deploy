import { Module } from '@nestjs/common';
import { CardimgService } from './cardimg.service';
import { CardimgController } from './cardimg.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cardimg } from './entities/cardimg.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Cardimg]),],
  controllers: [CardimgController],
  providers: [CardimgService],
})
export class CardimgModule {}
