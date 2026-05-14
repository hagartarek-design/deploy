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
exports.StudentsController = void 0;
const common_1 = require("@nestjs/common");
const students_service_1 = require("./students.service");
const create_student_dto_1 = require("./dto/create-student.dto");
const platform_express_1 = require("@nestjs/platform-express");
const public_1 = require("../auth/entities/public");
const auth_guard_1 = require("../../common/Gaurds/auth.guard");
let StudentsController = class StudentsController {
    constructor(studentsService) {
        this.studentsService = studentsService;
    }
    async sendSmsOtp(sendOtpDTO) {
        return await this.studentsService.sendSmsOtp(sendOtpDTO);
    }
    async typeonline(coursetype) {
        return await this.studentsService.typeonline(coursetype);
    }
    async searchStu(search) {
        return this.studentsService.searchStudents(search || '');
    }
    async searchCourseId(search, id) {
        return await this.studentsService.searchCourseId(search || '', id);
    }
    async profile(req) {
        console.log(req.user);
        return await this.studentsService.profile(req.user.id);
    }
    async search(search) {
        return this.studentsService.search(search || '');
    }
    async mycourses(req) {
        return await this.studentsService.mycourses(req['user'].id);
    }
    withpaginating(paginationDto) {
        const { page, limit } = paginationDto;
        const offset = (page - 1) * limit;
        return this.studentsService.getpagination(offset, limit);
    }
    getpaginationid(paginationDto, id) {
        const { page, limit } = paginationDto;
        const offset = (page - 1) * limit;
        return this.studentsService.getpaginationid(offset, limit, id);
    }
    async addAnswer(id, addAnswerDto) {
        return await this.studentsService.addAnswer(id, addAnswerDto);
    }
    async upload(UpdateStudentDto, req) {
        return await this.studentsService.update(UpdateStudentDto, req['user'].id);
    }
    async uploadFile(req, file) {
        if (!file) {
            throw new common_1.BadRequestException('No file uploaded');
        }
        const response = await this.studentsService.handleFileUpload(req['user'].id, file);
        return response;
    }
    async findbyId(id, req, page, limit, attendence, exam_name) {
        return await this.studentsService.findbyId(id, req.user.id, page, limit, attendence, exam_name);
    }
    async getattendence(attendence, id) {
        return await this.studentsService.getattendence(attendence, id);
    }
    async findAll() {
        return await this.studentsService.findAll();
    }
    async saveinfo(createstudDto) {
        return await this.studentsService.saveinfo(createstudDto);
    }
};
exports.StudentsController = StudentsController;
__decorate([
    (0, public_1.Public)(),
    (0, common_1.Post)('sendSmsOtp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_student_dto_1.sendOtpDTO]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "sendSmsOtp", null);
__decorate([
    (0, common_1.Get)('coursetype/:coursetype'),
    __param(0, (0, common_1.Param)('coursetype')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "typeonline", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "searchStu", null);
__decorate([
    (0, common_1.Get)('bycourse'),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "searchCourseId", null);
__decorate([
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "profile", null);
__decorate([
    (0, common_1.Get)('filter/:id'),
    __param(0, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "search", null);
__decorate([
    (0, common_1.Get)('mycourses/user'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "mycourses", null);
__decorate([
    (0, common_1.Get)('/pagination'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_student_dto_1.CreateStudentDto]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "withpaginating", null);
__decorate([
    (0, common_1.Get)('/paginationcour'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_student_dto_1.CreateStudentDto, Number]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "getpaginationid", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_student_dto_1.addAnswerDto]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "addAnswer", null);
__decorate([
    (0, common_1.Patch)('/schedualCenter/p'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_student_dto_1.UpdateStudentDtoinfo, Object]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "upload", null);
__decorate([
    (0, common_1.Patch)('/upload/pi'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)('findoneuser/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('limit')),
    __param(4, (0, common_1.Query)('attendence')),
    __param(5, (0, common_1.Query)('exam_name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Number, Number, Boolean, String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "findbyId", null);
__decorate([
    (0, common_1.Get)('/:attendence'),
    __param(0, (0, common_1.Param)('attendence')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, Number]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "getattendence", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('/stuInfo'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_student_dto_1.createstudDto]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "saveinfo", null);
exports.StudentsController = StudentsController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('students'),
    __metadata("design:paramtypes", [students_service_1.StudentsService])
], StudentsController);
//# sourceMappingURL=students.controller.js.map