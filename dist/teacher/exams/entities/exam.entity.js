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
exports.Exam = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const course_entity_1 = require("../../../courses/entities/course.entity");
const image_entity_1 = require("../../../teacher/images/entities/image.entity");
const lesson_entity_1 = require("../../../teacher/lesson/entities/lesson.entity");
const student_entity_1 = require("../../../students/entities/student.entity");
const user_entity_1 = require("../../../teacher/users/entities/user.entity");
const typeorm_1 = require("typeorm");
const attachment_entity_1 = require("../../../attachments/entities/attachment.entity");
const userquestion_entity_1 = require("../../../teacher/userquestion/entities/userquestion.entity");
let Exam = class Exam {
};
exports.Exam = Exam;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Exam.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => userquestion_entity_1.Userquestion, (question) => question.exam, {
        cascade: true,
        nullable: true
    }),
    __metadata("design:type", Array)
], Exam.prototype, "questions", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, common_1.Optional)(),
    __metadata("design:type", String)
], Exam.prototype, "imgcart", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, common_1.Optional)(),
    __metadata("design:type", String)
], Exam.prototype, "examplace", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_entity_1.Course, (course) => course.exam),
    __metadata("design:type", course_entity_1.Course)
], Exam.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => student_entity_1.Student, (student) => student.exam),
    __metadata("design:type", student_entity_1.Student)
], Exam.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => attachment_entity_1.Attachment, (attachment) => attachment.exam),
    __metadata("design:type", attachment_entity_1.Attachment)
], Exam.prototype, "attachment", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => lesson_entity_1.Lesson, lesson => lesson.exams),
    (0, typeorm_1.JoinTable)({
        name: 'exams_lessons',
        joinColumn: {
            name: 'exam_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'lesson_id',
            referencedColumnName: 'id',
        },
    }),
    __metadata("design:type", Array)
], Exam.prototype, "lessons", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, common_1.Optional)(),
    __metadata("design:type", Boolean)
], Exam.prototype, "attendence", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Exam.prototype, "grade", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => image_entity_1.Image, (image) => image.exam, { cascade: true }),
    __metadata("design:type", Array)
], Exam.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.exam, { onDelete: 'CASCADE' }),
    __metadata("design:type", user_entity_1.User)
], Exam.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: "exam" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Exam.prototype, "exam_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Exam.prototype, "exam_type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Exam.prototype, "examprice", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], Exam.prototype, "trials_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Exam.prototype, "durationmin", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Exam.prototype, "totaldegree", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Exam.prototype, "degree_success", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'tinyint' }),
    __metadata("design:type", Number)
], Exam.prototype, "showdegreeEveryQues", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'tinyint' }),
    __metadata("design:type", Number)
], Exam.prototype, "showDegreeafter", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false, nullable: true }),
    (0, common_1.Optional)(),
    __metadata("design:type", Boolean)
], Exam.prototype, "online", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Exam.prototype, "startdate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Exam.prototype, "seedate", void 0);
exports.Exam = Exam = __decorate([
    (0, typeorm_1.Entity)()
], Exam);
//# sourceMappingURL=exam.entity.js.map