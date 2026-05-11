import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, NotFoundException, Request } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Video } from './entities/video.entity';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService

    
  ) {}

    @Post('video')
    @UseInterceptors(
      FileInterceptor('video', {
        storage: diskStorage
        ({
          destination: './uploads/videos', 
          filename: (req, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const extension = extname(file.originalname);
            callback(null, `${uniqueSuffix}${extension}`);
          },
        }),
        fileFilter: (req, file, callback) => {
          if (!file.originalname.match(/\.(mp4|mov|avi)$/)) {
            return callback(new Error('Only video files are allowed!'), false);
          }
          callback(null, true);
        },
      }),
    )
    async uploadVideo(@UploadedFile() file: Express.Multer.File,@Request() req): Promise<Video> {
      return this.videosService.uploadVideo(file,req.user.id);
    }
  
    @Get('video/:id')
    async getVideo(@Param('id') id: number): Promise<Video> {
      const video = await this.videosService.getVideoById(id);
      if (!video) {
        throw new NotFoundException('Video not found');
      }
      return video;
    }
  



























// async getVideoPercent(sectionId: number, studentId: number): Promise<number> {
//   const progress = await this.videoRepo.findOne({
//     where: {
//       section: { id: sectionId },
//       student: { id: studentId },
//     },
//   });

//   return progress?.percent || 0;
// }




}
