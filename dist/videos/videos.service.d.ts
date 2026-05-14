import { Video } from './entities/video.entity';
import { Repository } from 'typeorm';
export declare class VideosService {
    private readonly videoRepository;
    constructor(videoRepository: Repository<Video>);
    uploadVideo(file: Express.Multer.File, id: number): Promise<Video>;
    getVideoById(id: number): Promise<Video>;
}
