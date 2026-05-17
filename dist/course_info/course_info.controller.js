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
exports.CourseInfoController = void 0;
const common_1 = require("@nestjs/common");
const course_info_service_1 = require("./course_info.service");
const create_course_info_dto_1 = require("./dto/create-course_info.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const public_decorator_1 = require("../common/decorator/public.decorator");
let CourseInfoController = class CourseInfoController {
    constructor(courseInfoService) {
        this.courseInfoService = courseInfoService;
    }
    async deletecourse_attend(id) {
        return await this.courseInfoService.deletecourse_attend(Number(id));
    }
    findmany() {
        return this.courseInfoService.findmany();
    }
    getall() {
        return this.courseInfoService.getall();
    }
    dropdown(id) {
        return this.courseInfoService.dropdown(Number(id));
    }
    async uploadVideo(file, id) {
        return this.courseInfoService.saveVideo(file, id);
    }
    async streamVideo(id, res) {
        const video = await this.courseInfoService.getVideo(+id);
        if (!video) {
            return res.status(404).send('Video not found');
        }
        return res.sendFile((0, path_1.join)(process.cwd(), video.path));
    }
    withpagination(paginationDto) {
        const { page, limit } = paginationDto;
        const offset = (page - 1) * limit;
        return this.courseInfoService.getpagination(offset, limit);
    }
};
exports.CourseInfoController = CourseInfoController;
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseInfoController.prototype, "deletecourse_attend", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CourseInfoController.prototype, "findmany", null);
__decorate([
    (0, common_1.Get)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CourseInfoController.prototype, "getall", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CourseInfoController.prototype, "dropdown", null);
__decorate([
    (0, common_1.Patch)('uploadforlesson'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: '/upload/videos',
            filename: (req, file, cb) => {
                const uniqueName = `${Date.now()}-${file.originalname}`;
                cb(null, uniqueName);
            }
        })
    })),
    (0, common_1.Patch)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/videos',
            filename: (req, file, cb) => {
                const uniqueName = `${Date.now()}-${file.originalname}`;
                cb(null, uniqueName);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], CourseInfoController.prototype, "uploadVideo", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('play/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CourseInfoController.prototype, "streamVideo", null);
__decorate([
    (0, common_1.Get)('/pagination'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_course_info_dto_1.CreateCourseInfoDto]),
    __metadata("design:returntype", void 0)
], CourseInfoController.prototype, "withpagination", null);
exports.CourseInfoController = CourseInfoController = __decorate([
    (0, common_1.Controller)('course-info'),
    __metadata("design:paramtypes", [course_info_service_1.CourseInfoService])
], CourseInfoController);
//# sourceMappingURL=course_info.controller.js.map