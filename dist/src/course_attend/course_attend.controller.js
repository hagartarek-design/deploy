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
exports.CourseAttendController = void 0;
const common_1 = require("@nestjs/common");
const course_attend_service_1 = require("./course_attend.service");
const create_course_attend_dto_1 = require("./dto/create-course_attend.dto");
const update_course_attend_dto_1 = require("./dto/update-course_attend.dto");
let CourseAttendController = class CourseAttendController {
    constructor(courseAttendService) {
        this.courseAttendService = courseAttendService;
    }
    create(createCourseAttendDto) {
        return this.courseAttendService.create(createCourseAttendDto);
    }
    withpaginating(paginationDto) {
        const { page, limit } = paginationDto;
        const offset = (page - 1) * limit;
        return this.courseAttendService.withpaginating(offset, limit);
    }
    withoutpaginating() {
        return this.courseAttendService.withoutpaginating();
    }
    update(id, updateCourseAttendDto) {
        return this.courseAttendService.update(+id, updateCourseAttendDto);
    }
};
exports.CourseAttendController = CourseAttendController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_course_attend_dto_1.CreateCourseAttendDto]),
    __metadata("design:returntype", void 0)
], CourseAttendController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_course_attend_dto_1.CreateCourseAttendDto]),
    __metadata("design:returntype", void 0)
], CourseAttendController.prototype, "withpaginating", null);
__decorate([
    (0, common_1.Get)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CourseAttendController.prototype, "withoutpaginating", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_course_attend_dto_1.UpdateCourseAttendDto]),
    __metadata("design:returntype", void 0)
], CourseAttendController.prototype, "update", null);
exports.CourseAttendController = CourseAttendController = __decorate([
    (0, common_1.Controller)('course-attend'),
    __metadata("design:paramtypes", [course_attend_service_1.CourseAttendService])
], CourseAttendController);
//# sourceMappingURL=course_attend.controller.js.map