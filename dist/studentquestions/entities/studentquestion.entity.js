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
exports.Studentquestion = void 0;
const course_entity_1 = require("../../courses/entities/course.entity");
const typeorm_1 = require("typeorm");
const student_entity_1 = require("../../students/entities/student.entity");
let Studentquestion = class Studentquestion {
};
exports.Studentquestion = Studentquestion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Studentquestion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: "1" }),
    __metadata("design:type", Number)
], Studentquestion.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: "شحن محفظتك" }),
    __metadata("design:type", String)
], Studentquestion.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Studentquestion.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Studentquestion.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Studentquestion.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_entity_1.Course, (course) => course.student_id, { nullable: true }),
    __metadata("design:type", course_entity_1.Course)
], Studentquestion.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => student_entity_1.Student, (student) => student.student_question),
    __metadata("design:type", student_entity_1.Student)
], Studentquestion.prototype, "student", void 0);
exports.Studentquestion = Studentquestion = __decorate([
    (0, typeorm_1.Entity)()
], Studentquestion);
//# sourceMappingURL=studentquestion.entity.js.map