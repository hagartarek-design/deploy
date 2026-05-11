"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideosService = void 0;
const common_1 = require("@nestjs/common");
const video_entity_1 = require("./entities/video.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let VideosService = class VideosService {
    constructor(videoRepository) {
        this.videoRepository = videoRepository;
    }
    async uploadVideo(file, id) {
        if (!file) {
            throw new common_1.BadRequestException('No video file uploaded');
        }
        const video = new video_entity_1.Video();
        video.filename = file.filename;
        video.filePath = file.path;
        video.originalName = file.originalname;
        video.mimeType = file.mimetype;
        video.size = file.size;
        return this.videoRepository.save({ video, id });
    }
    async getVideoById(id) {
        const video = await this.videoRepository.findOne({ where: { id: id } });
        if (!video) {
            throw new common_1.BadRequestException('Video not found');
        }
        return video;
    }
};
exports.VideosService = VideosService;
exports.VideosService = VideosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(video_entity_1.Video)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], VideosService);
//# sourceMappingURL=videos.service.js.map