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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExamDto = exports.CreateExamDto = void 0;
const class_validator_1 = require("class-validator");
class CreateExamDto {
    constructor() {
        this.page = 1;
        this.limit = 10;
    }
}
exports.CreateExamDto = CreateExamDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateExamDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateExamDto.prototype, "limit", void 0);
class createExamDto {
}
exports.createExamDto = createExamDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], createExamDto.prototype, "exam_name", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], createExamDto.prototype, "examprice", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], createExamDto.prototype, "trials_number", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], createExamDto.prototype, "durationmin", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], createExamDto.prototype, "totaldegree", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], createExamDto.prototype, "degree_success", void 0);
//# sourceMappingURL=create-exam.dto.js.map