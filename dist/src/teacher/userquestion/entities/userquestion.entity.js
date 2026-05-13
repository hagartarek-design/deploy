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
exports.Userquestion = void 0;
const assignment_entity_1 = require("../../../assignments/entities/assignment.entity");
const lesson_entity_1 = require("../../../teacher/lesson/entities/lesson.entity");
const student_entity_1 = require("../../../students/entities/student.entity");
const typeorm_1 = require("typeorm");
const exam_entity_1 = require("../../../teacher/exams/entities/exam.entity");
let Userquestion = class Userquestion {
};
exports.Userquestion = Userquestion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Userquestion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Userquestion.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Userquestion.prototype, "solved", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => lesson_entity_1.Lesson, (lesson) => lesson.questions, {}),
    __metadata("design:type", lesson_entity_1.Lesson)
], Userquestion.prototype, "lesson", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => exam_entity_1.Exam, (exam) => exam.questions, { nullable: true }),
    __metadata("design:type", exam_entity_1.Exam)
], Userquestion.prototype, "exam", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => assignment_entity_1.Assignment, (assignments) => assignments.questions, {}),
    __metadata("design:type", assignment_entity_1.Assignment)
], Userquestion.prototype, "assignments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => student_entity_1.Student, (students) => students.questions, {}),
    __metadata("design:type", Array)
], Userquestion.prototype, "students", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Userquestion.prototype, "month_by_year", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => lesson_entity_1.Lesson, (lessons) => lessons.userquestions, {}),
    __metadata("design:type", lesson_entity_1.Lesson)
], Userquestion.prototype, "lessons", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Userquestion.prototype, "type_ques", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Userquestion.prototype, "teacher_answer", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Userquestion.prototype, "student_answer", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Userquestion.prototype, "trueAnswer", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Userquestion.prototype, "trueAnswerExam", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Userquestion.prototype, "studentAnswerExam", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Userquestion.prototype, "chooses", void 0);
exports.Userquestion = Userquestion = __decorate([
    (0, typeorm_1.Entity)()
], Userquestion);
//# sourceMappingURL=userquestion.entity.js.map