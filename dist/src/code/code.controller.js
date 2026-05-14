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
exports.CodeController = void 0;
const common_1 = require("@nestjs/common");
const code_service_1 = require("./code.service");
const auth_guard_1 = require("../../common/Gaurds/auth.guard");
let CodeController = class CodeController {
    constructor(codeService) {
        this.codeService = codeService;
    }
    async generate(body) {
        return this.codeService.generateCards(body.amount, body.count);
    }
    async codes(page, limit) {
        return await this.codeService.codes(page, limit);
    }
    async recharge(req, body) {
        return this.codeService.rechargeCard(req['user'].userId, body.rechargeCode, body.amount);
    }
    async buy(req, body) {
        return this.codeService.buyCourse(req['user'].id, body.courseId);
    }
    async buySection(req, body) {
        return this.codeService.buySection(req['user'].id, body.sectionId);
    }
    async buySheet(req) {
        return this.codeService.buySheet(req['user'].id);
    }
    async clearcart(req) {
        return this.codeService.clearcart(req['user'].id);
    }
};
exports.CodeController = CodeController;
__decorate([
    (0, common_1.Post)('generate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CodeController.prototype, "generate", null);
__decorate([
    (0, common_1.Get)('withpag'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], CodeController.prototype, "codes", null);
__decorate([
    (0, common_1.Patch)('recharge'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CodeController.prototype, "recharge", null);
__decorate([
    (0, common_1.Patch)('buy'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CodeController.prototype, "buy", null);
__decorate([
    (0, common_1.Patch)('buy/sections'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CodeController.prototype, "buySection", null);
__decorate([
    (0, common_1.Patch)('buy/buySheet'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CodeController.prototype, "buySheet", null);
__decorate([
    (0, common_1.Patch)('buy/clearcart'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CodeController.prototype, "clearcart", null);
exports.CodeController = CodeController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('attachments'),
    (0, common_1.Controller)('code'),
    __metadata("design:paramtypes", [code_service_1.CodeService])
], CodeController);
//# sourceMappingURL=code.controller.js.map