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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const platform_express_1 = require("@nestjs/platform-express");
const create_section_dto_1 = require("../../sections/dto/create-section.dto");
const auth_guard_1 = require("../../common/Gaurds/auth.guard");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    userInputInfo(req, email, fullname, phone) {
        return this.usersService.userInputInfo(req.user.id, email, fullname, phone);
    }
    findAll(req) {
        console.log('mmm' + req);
        return this.usersService.findAll(req.user.id);
    }
    async uploadFile(req, file) {
        console.log('User:', req);
        if (!file) {
            console.log('User:', req);
            throw new common_1.BadRequestException('No file uploaded');
        }
        console.log('user' + req);
        const response = await this.usersService.handleFileUpload(req.user.id, file);
        return response;
    }
    async uploadcard(req, file, createSectionDto) {
        if (!file) {
            throw new common_1.BadRequestException('No file uploaded');
        }
        const response = await this.usersService.uploadFile(req.user.id, file, createSectionDto);
        return response;
    }
    teacherGrades() {
    }
    async getLastUserImage(req) {
        return this.usersService.getLastImage(req.user.id);
    }
    async getallimages(req) {
        return await this.usersService.getallimages(req.user.id);
    }
    async getimagebyid(req, id) {
        return this.usersService.getimagebyid(req.user.id, id);
    }
    async deleteimage(req, id) {
        return await this.usersService.deleteimage(req.user.id, id);
    }
    async deleteOwnAccount(req) {
        await this.usersService.deleteUserByAuth(req.user.id, req.user.id);
        return { message: 'Your account has been deleted' };
    }
    async deleteAccount(id) {
        await this.usersService.deleteAccount(id);
        return { message: 'Account deleted successfully' };
    }
    async restoreAccount(id) {
        await this.usersService.restoreAccount(id);
        return { message: 'Account restored successfully' };
    }
    async freezeAccount(req) {
        await this.usersService.freezeAccount(req.user.id);
        return { message: 'Account frozen successfully' };
    }
    async unfreezeAccount(req) {
        await this.usersService.unfreezeAccount(req.user.id);
        return { message: 'Account unfrozen successfully' };
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Patch)('updateInfo'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('email')),
    __param(2, (0, common_1.Body)('fullname')),
    __param(3, (0, common_1.Body)('phone')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "userInputInfo", null);
__decorate([
    (0, common_1.Get)('userInfo'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Patch)('/upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)('/upload'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_section_dto_1.CreateSectionDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "uploadcard", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "teacherGrades", null);
__decorate([
    (0, common_1.Get)('/images/last'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getLastUserImage", null);
__decorate([
    (0, common_1.Get)('/getallimages'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getallimages", null);
__decorate([
    (0, common_1.Get)('/uniqueImg/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getimagebyid", null);
__decorate([
    (0, common_1.Delete)('/image/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteimage", null);
__decorate([
    (0, common_1.Delete)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteOwnAccount", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteAccount", null);
__decorate([
    (0, common_1.Patch)('restore/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "restoreAccount", null);
__decorate([
    (0, common_1.Patch)('freeze'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "freezeAccount", null);
__decorate([
    (0, common_1.Patch)('unfreeze'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "unfreezeAccount", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map