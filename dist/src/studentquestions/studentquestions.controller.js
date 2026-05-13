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
exports.StudentquestionsController = void 0;
const common_1 = require("@nestjs/common");
const studentquestions_service_1 = require("./studentquestions.service");
const create_studentquestion_dto_1 = require("./dto/create-studentquestion.dto");
const update_studentquestion_dto_1 = require("./dto/update-studentquestion.dto");
let StudentquestionsController = class StudentquestionsController {
    constructor(studentquestionsService) {
        this.studentquestionsService = studentquestionsService;
    }
    create(createStudentquestionDto, req, name) {
        return this.studentquestionsService.create(createStudentquestionDto, req['student'].id, name);
    }
    findAll() {
        return this.studentquestionsService.findAll();
    }
    findOne(id) {
        return this.studentquestionsService.findOne(+id);
    }
    update(id, updateStudentquestionDto) {
        return this.studentquestionsService.update(+id, updateStudentquestionDto);
    }
    remove(id) {
        return this.studentquestionsService.remove(+id);
    }
};
exports.StudentquestionsController = StudentquestionsController;
__decorate([
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_studentquestion_dto_1.CreateStudentquestionDto, Object, String]),
    __metadata("design:returntype", void 0)
], StudentquestionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StudentquestionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudentquestionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_studentquestion_dto_1.UpdateStudentquestionDto]),
    __metadata("design:returntype", void 0)
], StudentquestionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudentquestionsController.prototype, "remove", null);
exports.StudentquestionsController = StudentquestionsController = __decorate([
    (0, common_1.Controller)('studentquestions'),
    __metadata("design:paramtypes", [studentquestions_service_1.StudentquestionsService])
], StudentquestionsController);
//# sourceMappingURL=studentquestions.controller.js.map