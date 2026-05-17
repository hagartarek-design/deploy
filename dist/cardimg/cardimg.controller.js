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
exports.CardimgController = void 0;
const common_1 = require("@nestjs/common");
const cardimg_service_1 = require("./cardimg.service");
const create_cardimg_dto_1 = require("./dto/create-cardimg.dto");
const update_cardimg_dto_1 = require("./dto/update-cardimg.dto");
let CardimgController = class CardimgController {
    constructor(cardimgService) {
        this.cardimgService = cardimgService;
    }
    create(createCardimgDto) {
        return this.cardimgService.create(createCardimgDto);
    }
    findAll() {
        return this.cardimgService.findAll();
    }
    findOne(id) {
        return this.cardimgService.findOne(+id);
    }
    update(id, updateCardimgDto) {
        return this.cardimgService.update(+id, updateCardimgDto);
    }
    remove(id) {
        return this.cardimgService.remove(+id);
    }
};
exports.CardimgController = CardimgController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cardimg_dto_1.CreateCardimgDto]),
    __metadata("design:returntype", void 0)
], CardimgController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CardimgController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CardimgController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_cardimg_dto_1.UpdateCardimgDto]),
    __metadata("design:returntype", void 0)
], CardimgController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CardimgController.prototype, "remove", null);
exports.CardimgController = CardimgController = __decorate([
    (0, common_1.Controller)('cardimg'),
    __metadata("design:paramtypes", [cardimg_service_1.CardimgService])
], CardimgController);
//# sourceMappingURL=cardimg.controller.js.map