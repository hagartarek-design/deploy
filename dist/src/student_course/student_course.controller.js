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
exports.StudentCourseController = void 0;
const common_1 = require("@nestjs/common");
const student_course_service_1 = require("./student_course.service");
const create_student_course_dto_1 = require("./dto/create-student_course.dto");
const update_student_course_dto_1 = require("./dto/update-student_course.dto");
const auth_guard_1 = require("../common/Gaurds/auth.guard");
let StudentCourseController = class StudentCourseController {
    constructor(studentCourseService) {
        this.studentCourseService = studentCourseService;
    }
    create(createStudentCourseDto) {
        return this.studentCourseService.create(createStudentCourseDto);
    }
    studentcourse(req) {
        return this.studentCourseService.studentcourse(req['student'].id);
    }
    studentcourse2(req, name) {
        return this.studentCourseService.studentcourse2(req['student'].id, name);
    }
    coursebystudent(req) {
        return this.studentCourseService.coursebystudent(req['student'].id);
    }
    async courseinfo(req, course_id) {
        return await this.studentCourseService.courseinfo(req['student'].id, course_id);
    }
    async courseinfobyid(req, courseId) {
        return await this.studentCourseService.courseinfobyid(req['student'].id, courseId);
    }
    async isEnrolled(req, courseId) {
        const result = await this.studentCourseService.isEnrolled(req['student'].id, courseId);
        return { enrolled: result };
    }
    async courseinfobyid2(req, infoid) {
        return await this.studentCourseService.courseinfobyid2(req['student'].id, infoid);
    }
    findOne(id) {
        return this.studentCourseService.findOne(+id);
    }
    update(id, updateStudentCourseDto) {
        return this.studentCourseService.update(+id, updateStudentCourseDto);
    }
    remove(id) {
        return this.studentCourseService.remove(+id);
    }
};
exports.StudentCourseController = StudentCourseController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_student_course_dto_1.CreateStudentCourseDto]),
    __metadata("design:returntype", void 0)
], StudentCourseController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StudentCourseController.prototype, "studentcourse", null);
__decorate([
    (0, common_1.Get)('courses'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], StudentCourseController.prototype, "studentcourse2", null);
__decorate([
    (0, common_1.Get)('course'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StudentCourseController.prototype, "coursebystudent", null);
__decorate([
    (0, common_1.Get)('courseInfo/'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('course_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], StudentCourseController.prototype, "courseinfo", null);
__decorate([
    (0, common_1.Get)('courseInfoid'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], StudentCourseController.prototype, "courseinfobyid", null);
__decorate([
    (0, common_1.Get)('/isEnrolled/:courseId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], StudentCourseController.prototype, "isEnrolled", null);
__decorate([
    (0, common_1.Get)('sections/:infoid'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('infoid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], StudentCourseController.prototype, "courseinfobyid2", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudentCourseController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_student_course_dto_1.UpdateStudentCourseDto]),
    __metadata("design:returntype", void 0)
], StudentCourseController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudentCourseController.prototype, "remove", null);
exports.StudentCourseController = StudentCourseController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('student-course'),
    __metadata("design:paramtypes", [student_course_service_1.StudentCourseService])
], StudentCourseController);
//# sourceMappingURL=student_course.controller.js.map