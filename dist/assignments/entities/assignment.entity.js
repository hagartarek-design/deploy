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
exports.Assignment = void 0;
const attachment_entity_1 = require("../../attachments/entities/attachment.entity");
const course_entity_1 = require("../../courses/entities/course.entity");
const userquestion_entity_1 = require("../../teacher/userquestion/entities/userquestion.entity");
const user_entity_1 = require("../../teacher/users/entities/user.entity");
const typeorm_1 = require("typeorm");
let Assignment = class Assignment {
};
exports.Assignment = Assignment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Assignment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Assignment.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => userquestion_entity_1.Userquestion, (questions) => questions.assignments),
    __metadata("design:type", userquestion_entity_1.Userquestion)
], Assignment.prototype, "questions", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Assignment.prototype, "degree", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Column)({ type: 'date', default: '2025-01-05' }),
    __metadata("design:type", Date)
], Assignment.prototype, "lastdate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', default: '2025-01-05' }),
    __metadata("design:type", Date)
], Assignment.prototype, "startdate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Assignment.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.assignment, { onDelete: 'CASCADE' }),
    __metadata("design:type", user_entity_1.User)
], Assignment.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_entity_1.Course, (course) => course.assignment, { onDelete: 'CASCADE' }),
    __metadata("design:type", course_entity_1.Course)
], Assignment.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => attachment_entity_1.Attachment, (attachment) => attachment.assignments, { onDelete: 'CASCADE' }),
    __metadata("design:type", attachment_entity_1.Attachment)
], Assignment.prototype, "attachment", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Assignment.prototype, "assigcardimg", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeorm_1.Timestamp)
], Assignment.prototype, "created_date", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", typeorm_1.Timestamp)
], Assignment.prototype, "Updated_date", void 0);
exports.Assignment = Assignment = __decorate([
    (0, typeorm_1.Entity)()
], Assignment);
//# sourceMappingURL=assignment.entity.js.map