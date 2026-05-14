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
exports.Section = void 0;
const course_info_entity_1 = require("../../course_info/entities/course_info.entity");
const course_entity_1 = require("../../courses/entities/course.entity");
const student_entity_1 = require("../../students/entities/student.entity");
const lesson_entity_1 = require("../../teacher/lesson/entities/lesson.entity");
const user_entity_1 = require("../../teacher/users/entities/user.entity");
const typeorm_1 = require("typeorm");
const cart_entity_1 = require("../../cart/entities/cart.entity");
let Section = class Section {
};
exports.Section = Section;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Section.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => lesson_entity_1.Lesson, (lesson) => lesson.section),
    __metadata("design:type", Array)
], Section.prototype, "lesson", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Section.prototype, "totalProgress", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Section.prototype, "percent", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], Section.prototype, "overallProgress", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Section.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Section.prototype, "isUsed", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Section.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Section.prototype, "cardimg", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Section.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Section.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cart_entity_1.Cart, (cart) => cart.section),
    __metadata("design:type", Array)
], Section.prototype, "cart", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Section.prototype, "viewingWatching", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_entity_1.Course, (course) => course.section, { onDelete: 'CASCADE' }),
    __metadata("design:type", course_entity_1.Course)
], Section.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => student_entity_1.Student, (student) => student.sections, { onDelete: 'CASCADE' }),
    __metadata("design:type", student_entity_1.Student)
], Section.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_info_entity_1.CourseInfo, (course_info) => course_info.section, { onDelete: 'CASCADE' }),
    __metadata("design:type", course_info_entity_1.CourseInfo)
], Section.prototype, "course_info", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.section, { onDelete: 'CASCADE' }),
    __metadata("design:type", user_entity_1.User)
], Section.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Section.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => student_entity_1.Student, student => student.sections, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION', }),
    __metadata("design:type", Array)
], Section.prototype, "students", void 0);
exports.Section = Section = __decorate([
    (0, typeorm_1.Entity)()
], Section);
//# sourceMappingURL=section.entity.js.map