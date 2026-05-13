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
exports.CourseInfo = void 0;
const course_entity_1 = require("../../courses/entities/course.entity");
const dailytable_entity_1 = require("../../teacher/dailytable/entities/dailytable.entity");
const student_entity_1 = require("../../students/entities/student.entity");
const typeorm_1 = require("typeorm");
const section_entity_1 = require("../../sections/entities/section.entity");
let CourseInfo = class CourseInfo {
};
exports.CourseInfo = CourseInfo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CourseInfo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CourseInfo.prototype, "fromdate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CourseInfo.prototype, "todate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => section_entity_1.Section, (section) => section.course_info),
    __metadata("design:type", Array)
], CourseInfo.prototype, "section", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CourseInfo.prototype, "course_num", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CourseInfo.prototype, "course_center", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CourseInfo.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeorm_1.Timestamp)
], CourseInfo.prototype, "created_date", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", typeorm_1.Timestamp)
], CourseInfo.prototype, "Updated_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "2025-01-05 09:40:58.267985" }),
    __metadata("design:type", Date)
], CourseInfo.prototype, "question_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', default: '2025-01-05' }),
    __metadata("design:type", Date)
], CourseInfo.prototype, "coursetabledate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CourseInfo.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CourseInfo.prototype, "course_name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_entity_1.Course, (courses) => courses.course_info, {}),
    __metadata("design:type", course_entity_1.Course)
], CourseInfo.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => student_entity_1.Student, (productCharacteristic) => productCharacteristic.course_info),
    __metadata("design:type", student_entity_1.Student)
], CourseInfo.prototype, "students", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => dailytable_entity_1.Dailytable, (dailytable) => dailytable.course_info),
    __metadata("design:type", dailytable_entity_1.Dailytable)
], CourseInfo.prototype, "dailytable", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CourseInfo.prototype, "originalName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CourseInfo.prototype, "mimetype", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CourseInfo.prototype, "filename", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CourseInfo.prototype, "path", void 0);
exports.CourseInfo = CourseInfo = __decorate([
    (0, typeorm_1.Entity)()
], CourseInfo);
//# sourceMappingURL=course_info.entity.js.map