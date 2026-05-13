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
exports.ExamsController = void 0;
const common_1 = require("@nestjs/common");
const exams_service_1 = require("./exams.service");
const create_exam_dto_1 = require("./dto/create-exam.dto");
const platform_express_1 = require("@nestjs/platform-express");
const auth_guard_1 = require("../../../common/Gaurds/auth.guard");
let ExamsController = class ExamsController {
    constructor(examsService) {
        this.examsService = examsService;
    }
    create(createExamDto) {
        return this.examsService.create(createExamDto);
    }
    async exam_offline_online(online, page, limit) {
        return await this.examsService.exam_offline_online(online, page, limit);
    }
    async uploadcard(req, file, createExamDto) {
        console.log('User:', req.user);
        console.log('Uploaded File:', file);
        if (!file) {
            throw new common_1.BadRequestException('No file uploaded');
        }
        const response = await this.examsService.uploadFile(req.user.id, file, createExamDto);
        return response;
    }
    withpaginating(page, limit) {
        return this.examsService.getpagination(page, limit);
    }
    withpaginatingonline(page, limit) {
        return this.examsService.getpaginationonline(page, limit);
    }
    async search(search) {
        console.log(this.examsService.searchExams(search || ''));
        return this.examsService.searchExams(search || '');
    }
    remove(id) {
        return this.examsService.remove(+id);
    }
};
exports.ExamsController = ExamsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_exam_dto_1.CreateExamDto]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('online/offline'),
    __param(0, (0, common_1.Query)('online')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, Number, Number]),
    __metadata("design:returntype", Promise)
], ExamsController.prototype, "exam_offline_online", null);
__decorate([
    (0, common_1.Post)('/upload'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_exam_dto_1.createExamDto]),
    __metadata("design:returntype", Promise)
], ExamsController.prototype, "uploadcard", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "withpaginating", null);
__decorate([
    (0, common_1.Get)('online'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "withpaginatingonline", null);
__decorate([
    (0, common_1.Get)('filter/:id'),
    __param(0, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExamsController.prototype, "search", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "remove", null);
exports.ExamsController = ExamsController = __decorate([
    (0, common_1.Controller)('exams'),
    __metadata("design:paramtypes", [exams_service_1.ExamsService])
], ExamsController);
//# sourceMappingURL=exams.controller.js.map