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
exports.CourseReservationController = void 0;
const common_1 = require("@nestjs/common");
const course_reservation_service_1 = require("./course_reservation.service");
const create_course_reservation_dto_1 = require("./dto/create-course_reservation.dto");
const update_course_reservation_dto_1 = require("./dto/update-course_reservation.dto");
let CourseReservationController = class CourseReservationController {
    constructor(courseReservationService) {
        this.courseReservationService = courseReservationService;
    }
    getcoursereservation() {
        return this.courseReservationService.getcoursereservation();
    }
    create(createCourseReservationDto) {
        return this.courseReservationService.create(createCourseReservationDto);
    }
    findAll() {
        return this.courseReservationService.findAll();
    }
    findOne(id) {
        return this.courseReservationService.findOne(+id);
    }
    update(id, updateCourseReservationDto) {
        return this.courseReservationService.update(+id, updateCourseReservationDto);
    }
    remove(id) {
        return this.courseReservationService.remove(+id);
    }
};
exports.CourseReservationController = CourseReservationController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CourseReservationController.prototype, "getcoursereservation", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_course_reservation_dto_1.CreateCourseReservationDto]),
    __metadata("design:returntype", void 0)
], CourseReservationController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CourseReservationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CourseReservationController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_course_reservation_dto_1.UpdateCourseReservationDto]),
    __metadata("design:returntype", void 0)
], CourseReservationController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CourseReservationController.prototype, "remove", null);
exports.CourseReservationController = CourseReservationController = __decorate([
    (0, common_1.Controller)('course-reservation'),
    __metadata("design:paramtypes", [course_reservation_service_1.CourseReservationService])
], CourseReservationController);
//# sourceMappingURL=course_reservation.controller.js.map