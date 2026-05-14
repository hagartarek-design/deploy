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
exports.CreatePdfDto = exports.TrackProgressDto = exports.ProgressTrackDto = exports.Lesson = void 0;
const class_validator_1 = require("class-validator");
const cart_entity_1 = require("../../../cart/entities/cart.entity");
const content_entity_1 = require("../../../content/entities/content.entity");
const section_entity_1 = require("../../../sections/entities/section.entity");
const student_entity_1 = require("../../../students/entities/student.entity");
const exam_entity_1 = require("../../../teacher/exams/entities/exam.entity");
const userquestion_entity_1 = require("../../../teacher/userquestion/entities/userquestion.entity");
const typeorm_1 = require("typeorm");
let Lesson = class Lesson {
};
exports.Lesson = Lesson;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Lesson.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('json', { nullable: true }),
    __metadata("design:type", Object)
], Lesson.prototype, "videoProgress", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 0 }),
    __metadata("design:type", Number)
], Lesson.prototype, "viewedCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, }),
    __metadata("design:type", Number)
], Lesson.prototype, "viewedImages", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], Lesson.prototype, "percentage", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 0 }),
    __metadata("design:type", Number)
], Lesson.prototype, "percentageAnswer", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 0 }),
    __metadata("design:type", Number)
], Lesson.prototype, "viewPercent", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 0 }),
    __metadata("design:type", Number)
], Lesson.prototype, "totalImages", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Lesson.prototype, "totalVideosCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Lesson.prototype, "completedVideosCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], Lesson.prototype, "isUsed", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], Lesson.prototype, "imagePaths", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { nullable: true }),
    __metadata("design:type", Number)
], Lesson.prototype, "totalPages", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Lesson.prototype, "filePath", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { default: 0, nullable: true }),
    __metadata("design:type", Number)
], Lesson.prototype, "pageCount", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cart_entity_1.Cart, (cart) => cart.lesson),
    __metadata("design:type", Array)
], Lesson.prototype, "cart", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Lesson.prototype, "pageOrder", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Lesson.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Lesson.prototype, "originalName2", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 150 }),
    __metadata("design:type", Number)
], Lesson.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Lesson.prototype, "extractedText", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: "longblob" }),
    __metadata("design:type", Buffer)
], Lesson.prototype, "fileData", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => student_entity_1.Student, (student) => student.lesson, {}),
    __metadata("design:type", student_entity_1.Student)
], Lesson.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Lesson.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Lesson.prototype, "question_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Lesson.prototype, "question", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Lesson.prototype, "answer", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Lesson.prototype, "course_num", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => userquestion_entity_1.Userquestion, (question) => question.lesson),
    __metadata("design:type", Array)
], Lesson.prototype, "questions", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => exam_entity_1.Exam, exam => exam.lessons),
    __metadata("design:type", Array)
], Lesson.prototype, "exams", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => content_entity_1.Content, (content) => content.lesson),
    __metadata("design:type", Array)
], Lesson.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => userquestion_entity_1.Userquestion, (question) => question.lessons),
    __metadata("design:type", Array)
], Lesson.prototype, "userquestions", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => section_entity_1.Section, (section) => section.lesson),
    __metadata("design:type", section_entity_1.Section)
], Lesson.prototype, "section", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Lesson.prototype, "placecountry", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Lesson.prototype, "originalName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Lesson.prototype, "mimetype", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Lesson.prototype, "mimeTypes", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Lesson.prototype, "filename", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Lesson.prototype, "filename2", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Lesson.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Lesson.prototype, "path2", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Lesson.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { nullable: true }),
    __metadata("design:type", Number)
], Lesson.prototype, "newIndex", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { nullable: true }),
    __metadata("design:type", Number)
], Lesson.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Lesson.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Lesson.prototype, "pdfPath", void 0);
__decorate([
    (0, typeorm_1.Column)('json', { nullable: true }),
    __metadata("design:type", Array)
], Lesson.prototype, "pdfImages", void 0);
__decorate([
    (0, typeorm_1.Column)('json', { nullable: true }),
    __metadata("design:type", Array)
], Lesson.prototype, "pdfViews", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Lesson.prototype, "totalProgress", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], Lesson.prototype, "overallProgress", void 0);
exports.Lesson = Lesson = __decorate([
    (0, typeorm_1.Entity)()
], Lesson);
class ProgressTrackDto {
}
exports.ProgressTrackDto = ProgressTrackDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ProgressTrackDto.prototype, "currentTime", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ProgressTrackDto.prototype, "duration", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], ProgressTrackDto.prototype, "percentage", void 0);
class TrackProgressDto {
}
exports.TrackProgressDto = TrackProgressDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TrackProgressDto.prototype, "currentTime", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TrackProgressDto.prototype, "duration", void 0);
class CreatePdfDto {
}
exports.CreatePdfDto = CreatePdfDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePdfDto.prototype, "originalName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePdfDto.prototype, "filename2", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePdfDto.prototype, "filePath", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePdfDto.prototype, "totalPages", void 0);
//# sourceMappingURL=lesson.entity.js.map