import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Video } from './entities/video.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';



@Injectable()
export class VideosService {
constructor(@InjectRepository(Video) private readonly videoRepository:Repository<Video>){

}

  
    async uploadVideo(file: Express.Multer.File ,id:number): Promise<Video> {
      if (!file) {
        throw new BadRequestException('No video file uploaded');
      }
  
      const video = new Video();
      video.filename = file.filename;
      video.filePath = file.path;
      video.originalName = file.originalname;
      video.mimeType = file.mimetype;
      video.size = file.size;
  
      return this.videoRepository.save({video,id});
    }
  
    async getVideoById(id: number): Promise<Video> {
      const video = await this.videoRepository.findOne({ where: { id :id} });
      if (!video) {
        throw new BadRequestException('Video not found');
      }
      return video;
    }
  


 
}
