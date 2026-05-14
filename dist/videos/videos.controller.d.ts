import { VideosService } from './videos.service';
import { Video } from './entities/video.entity';
export declare class VideosController {
    private readonly videosService;
    constructor(videosService: VideosService);
    uploadVideo(file: Express.Multer.File, req: any): Promise<Video>;
    getVideo(id: number): Promise<Video>;
}
