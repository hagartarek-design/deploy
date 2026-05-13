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
exports.User = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const assignment_entity_1 = require("../../../assignments/entities/assignment.entity");
const exam_entity_1 = require("../../../teacher/exams/entities/exam.entity");
const image_entity_1 = require("../../../teacher/images/entities/image.entity");
const section_entity_1 = require("../../../sections/entities/section.entity");
const typeorm_1 = require("typeorm");
const course_entity_1 = require("../../../courses/entities/course.entity");
const user_entity_1 = require("../../../users/entities/user.entity");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: "1" }),
    __metadata("design:type", String)
], User.prototype, "grade", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: true }),
    (0, common_1.Optional)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "cardimg", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "examcardimg", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "assigcardimg", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "googleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "refreshToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "resetToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true, nullable: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "fullname", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => image_entity_1.Image, (image) => image.user, { cascade: true }),
    __metadata("design:type", Array)
], User.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => section_entity_1.Section, (section) => section.userId, { cascade: true }),
    __metadata("design:type", Array)
], User.prototype, "section", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => assignment_entity_1.Assignment, (assignment) => assignment.userId, { cascade: true }),
    __metadata("design:type", Array)
], User.prototype, "assignment", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => exam_entity_1.Exam, (exam) => exam.userId, { cascade: true }),
    __metadata("design:type", Array)
], User.prototype, "exam", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => course_entity_1.Course, course => course.users, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }),
    (0, typeorm_1.JoinTable)({
        name: 'user_course',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'course_id',
            referencedColumnName: 'id',
        },
    }),
    __metadata("design:type", Array)
], User.prototype, "courses", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "picture", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        default: 'user',
    }),
    __metadata("design:type", String)
], User.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'user' }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.Users, users => users.teacher),
    __metadata("design:type", user_entity_1.Users)
], User.prototype, "user", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
//# sourceMappingURL=user.entity.js.map