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
exports.DailytableController = void 0;
const common_1 = require("@nestjs/common");
const dailytable_service_1 = require("./dailytable.service");
const create_dailytable_dto_1 = require("./dto/create-dailytable.dto");
const update_dailytable_dto_1 = require("./dto/update-dailytable.dto");
let DailytableController = class DailytableController {
    constructor(dailytableService) {
        this.dailytableService = dailytableService;
    }
    create(createDailytableDto) {
        return this.dailytableService.create(createDailytableDto);
    }
    findAll(coursetabledate) {
        return this.dailytableService.findAll(coursetabledate);
    }
    findOne(id) {
        return this.dailytableService.findOne(+id);
    }
    update(id, updateDailytableDto) {
        return this.dailytableService.update(+id, updateDailytableDto);
    }
    remove(id) {
        return this.dailytableService.remove(+id);
    }
};
exports.DailytableController = DailytableController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dailytable_dto_1.CreateDailytableDto]),
    __metadata("design:returntype", void 0)
], DailytableController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('coursetabledate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Date]),
    __metadata("design:returntype", void 0)
], DailytableController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DailytableController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_dailytable_dto_1.UpdateDailytableDto]),
    __metadata("design:returntype", void 0)
], DailytableController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DailytableController.prototype, "remove", null);
exports.DailytableController = DailytableController = __decorate([
    (0, common_1.Controller)('dailytable'),
    __metadata("design:paramtypes", [dailytable_service_1.DailytableService])
], DailytableController);
//# sourceMappingURL=dailytable.controller.js.map