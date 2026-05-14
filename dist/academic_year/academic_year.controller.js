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
exports.AcademicYearController = void 0;
const common_1 = require("@nestjs/common");
const academic_year_service_1 = require("./academic_year.service");
const create_academic_year_dto_1 = require("./dto/create-academic_year.dto");
const update_academic_year_dto_1 = require("./dto/update-academic_year.dto");
let AcademicYearController = class AcademicYearController {
    constructor(academicYearService) {
        this.academicYearService = academicYearService;
    }
    create(createAcademicYearDto) {
        return this.academicYearService.create(createAcademicYearDto);
    }
    findAll() {
        return this.academicYearService.findAll();
    }
    findOne(id) {
        return this.academicYearService.findOne(+id);
    }
    update(id, updateAcademicYearDto) {
        return this.academicYearService.update(+id, updateAcademicYearDto);
    }
    remove(id) {
        return this.academicYearService.remove(+id);
    }
};
exports.AcademicYearController = AcademicYearController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_academic_year_dto_1.CreateAcademicYearDto]),
    __metadata("design:returntype", void 0)
], AcademicYearController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AcademicYearController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AcademicYearController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_academic_year_dto_1.UpdateAcademicYearDto]),
    __metadata("design:returntype", void 0)
], AcademicYearController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AcademicYearController.prototype, "remove", null);
exports.AcademicYearController = AcademicYearController = __decorate([
    (0, common_1.Controller)('academic-year'),
    __metadata("design:paramtypes", [academic_year_service_1.AcademicYearService])
], AcademicYearController);
//# sourceMappingURL=academic_year.controller.js.map