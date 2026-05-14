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
exports.AttachmentsController = void 0;
const common_1 = require("@nestjs/common");
const attachments_service_1 = require("./attachments.service");
const create_attachment_dto_1 = require("./dto/create-attachment.dto");
const update_attachment_dto_1 = require("./dto/update-attachment.dto");
const auth_guard_1 = require("../common/Gaurds/auth.guard");
let AttachmentsController = class AttachmentsController {
    constructor(attachmentsService) {
        this.attachmentsService = attachmentsService;
    }
    async addToCart(req, id) {
        return await this.attachmentsService.addToCart(req['student'].id, id);
    }
    async addlessontocart(req, id) {
        return await this.attachmentsService.addlessontocart(req['student'].id, id);
    }
    async findused() {
        return await this.attachmentsService.findused();
    }
    async findunused() {
        return await this.attachmentsService.findunused();
    }
    async create(createAttachmentDto) {
        return await this.attachmentsService.create(createAttachmentDto);
    }
    findAll(status) {
        return this.attachmentsService.findAll(status);
    }
    findOne(id) {
        return this.attachmentsService.findOne(+id);
    }
    update(id, updateAttachmentDto) {
        return this.attachmentsService.update(+id, updateAttachmentDto);
    }
    remove(id) {
        return this.attachmentsService.remove(+id);
    }
};
exports.AttachmentsController = AttachmentsController;
__decorate([
    (0, common_1.Post)('addtocart/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], AttachmentsController.prototype, "addToCart", null);
__decorate([
    (0, common_1.Post)('addlessontocart/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], AttachmentsController.prototype, "addlessontocart", null);
__decorate([
    (0, common_1.Get)('allusedattach'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AttachmentsController.prototype, "findused", null);
__decorate([
    (0, common_1.Get)('allunusedattach'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AttachmentsController.prototype, "findunused", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_attachment_dto_1.CreateAttachmentDto]),
    __metadata("design:returntype", Promise)
], AttachmentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)("status")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AttachmentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AttachmentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_attachment_dto_1.UpdateAttachmentDto]),
    __metadata("design:returntype", void 0)
], AttachmentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AttachmentsController.prototype, "remove", null);
exports.AttachmentsController = AttachmentsController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('attachments'),
    __metadata("design:paramtypes", [attachments_service_1.AttachmentsService])
], AttachmentsController);
//# sourceMappingURL=attachments.controller.js.map