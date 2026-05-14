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
exports.sendOtpDTO = exports.createstudDto = exports.addAnswerDto = exports.UpdateStudentDtoinfo = exports.CreateStudentDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateStudentDto {
    constructor() {
        this.page = 1;
        this.limit = 10;
    }
}
exports.CreateStudentDto = CreateStudentDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateStudentDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateStudentDto.prototype, "limit", void 0);
class UpdateStudentDtoinfo {
}
exports.UpdateStudentDtoinfo = UpdateStudentDtoinfo;
class addAnswerDto {
}
exports.addAnswerDto = addAnswerDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], addAnswerDto.prototype, "teacher_answer", void 0);
class createstudDto {
}
exports.createstudDto = createstudDto;
class sendOtpDTO {
}
exports.sendOtpDTO = sendOtpDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], sendOtpDTO.prototype, "phoneNum", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], sendOtpDTO.prototype, "otp", void 0);
//# sourceMappingURL=create-student.dto.js.map