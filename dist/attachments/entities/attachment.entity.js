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
exports.Attachment = void 0;
const typeorm_1 = require("typeorm");
const assignment_entity_1 = require("../../assignments/entities/assignment.entity");
const exam_entity_1 = require("../../teacher/exams/entities/exam.entity");
const cart_entity_1 = require("../../cart/entities/cart.entity");
const student_entity_1 = require("../../students/entities/student.entity");
let Attachment = class Attachment {
};
exports.Attachment = Attachment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Attachment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Attachment.prototype, "cycle", void 0);
__decorate([
    (0, typeorm_1.Column)({}),
    __metadata("design:type", Number)
], Attachment.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Attachment.prototype, "countassign", void 0);
__decorate([
    (0, typeorm_1.Column)({}),
    __metadata("design:type", String)
], Attachment.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({}),
    __metadata("design:type", Boolean)
], Attachment.prototype, "isUsed", void 0);
__decorate([
    (0, typeorm_1.Column)({}),
    __metadata("design:type", Number)
], Attachment.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => assignment_entity_1.Assignment, (assignment) => assignment.attachment),
    __metadata("design:type", Array)
], Attachment.prototype, "assignments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => exam_entity_1.Exam, (exam) => exam.attachment),
    __metadata("design:type", Array)
], Attachment.prototype, "exam", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => student_entity_1.Student, (student) => student.attachments),
    __metadata("design:type", student_entity_1.Student)
], Attachment.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cart_entity_1.Cart, (cart) => cart.attachment),
    __metadata("design:type", Array)
], Attachment.prototype, "cart", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Attachment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Attachment.prototype, "createdAt", void 0);
exports.Attachment = Attachment = __decorate([
    (0, typeorm_1.Entity)()
], Attachment);
//# sourceMappingURL=attachment.entity.js.map