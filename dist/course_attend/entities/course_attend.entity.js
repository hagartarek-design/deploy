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
exports.CourseAttend = void 0;
const course_entity_1 = require("../../courses/entities/course.entity");
const typeorm_1 = require("typeorm");
let CourseAttend = class CourseAttend {
};
exports.CourseAttend = CourseAttend;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CourseAttend.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CourseAttend.prototype, "month", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CourseAttend.prototype, "days", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CourseAttend.prototype, "seen_amount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CourseAttend.prototype, "pay_amount", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_entity_1.Course, (courses) => courses.course_attend, {}),
    __metadata("design:type", course_entity_1.Course)
], CourseAttend.prototype, "course", void 0);
exports.CourseAttend = CourseAttend = __decorate([
    (0, typeorm_1.Entity)()
], CourseAttend);
//# sourceMappingURL=course_attend.entity.js.map