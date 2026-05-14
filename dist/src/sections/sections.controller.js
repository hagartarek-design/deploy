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
exports.SectionsController = void 0;
const common_1 = require("@nestjs/common");
const sections_service_1 = require("./sections.service");
const create_section_dto_1 = require("./dto/create-section.dto");
const update_section_dto_1 = require("./dto/update-section.dto");
const auth_guard_1 = require("../common/Gaurds/auth.guard");
let SectionsController = class SectionsController {
    constructor(sectionsService) {
        this.sectionsService = sectionsService;
    }
    savesection(createSectionDto, req) {
        return this.sectionsService.savesection(createSectionDto, req.user.id);
    }
    async withpaginatingsections(req, paginationDto) {
        const { page, limit } = paginationDto;
        if (page && limit) {
            const offset = (page - 1) * limit;
            return this.sectionsService.withpaginatingsections(req.user.id, offset, limit);
        }
        else {
            return this.sectionsService.allsections(req.user.id);
        }
    }
    allsections(req) {
        return this.sectionsService.allsections(req.user.id);
    }
    async mysections() {
        return await this.sectionsService.mysections();
    }
    async addToCart(req, id) {
        return await this.sectionsService.addToCart(req['student'].id, id);
    }
    async isEnrolled(req, sectionId) {
        const result = await this.sectionsService.isEnrolled(req['student'].id, sectionId);
        return { enrolled: result };
    }
    async payWithCode(req, code, sectionId) {
        return await this.sectionsService.payWithCode(req['student'].id, code, sectionId);
    }
    remove(id, req) {
        return this.sectionsService.remove(+id, req.user.id);
    }
};
exports.SectionsController = SectionsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_section_dto_1.CreateSectionDto, Object]),
    __metadata("design:returntype", void 0)
], SectionsController.prototype, "savesection", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_section_dto_1.UpdateSectionDto]),
    __metadata("design:returntype", Promise)
], SectionsController.prototype, "withpaginatingsections", null);
__decorate([
    (0, common_1.Get)('allsections'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SectionsController.prototype, "allsections", null);
__decorate([
    (0, common_1.Get)('/mysections'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SectionsController.prototype, "mysections", null);
__decorate([
    (0, common_1.Post)('addtocart/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], SectionsController.prototype, "addToCart", null);
__decorate([
    (0, common_1.Get)('/isEnrolled/:sectionId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('sectionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], SectionsController.prototype, "isEnrolled", null);
__decorate([
    (0, common_1.Patch)('/pay-with-code/charge'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('code')),
    __param(2, (0, common_1.Query)('sectionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number]),
    __metadata("design:returntype", Promise)
], SectionsController.prototype, "payWithCode", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SectionsController.prototype, "remove", null);
exports.SectionsController = SectionsController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('sections'),
    __metadata("design:paramtypes", [sections_service_1.SectionsService])
], SectionsController);
//# sourceMappingURL=sections.controller.js.map