"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentsModule = void 0;
const common_1 = require("@nestjs/common");
const attachments_service_1 = require("./attachments.service");
const attachments_controller_1 = require("./attachments.controller");
const typeorm_1 = require("@nestjs/typeorm");
const attachment_entity_1 = require("./entities/attachment.entity");
const exam_entity_1 = require("../teacher/exams/entities/exam.entity");
const assignment_entity_1 = require("../assignments/entities/assignment.entity");
const course_entity_1 = require("../courses/entities/course.entity");
const cart_entity_1 = require("../cart/entities/cart.entity");
const student_entity_1 = require("../students/entities/student.entity");
const lesson_entity_1 = require("../teacher/lesson/entities/lesson.entity");
let AttachmentsModule = class AttachmentsModule {
};
exports.AttachmentsModule = AttachmentsModule;
exports.AttachmentsModule = AttachmentsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([attachment_entity_1.Attachment, exam_entity_1.Exam, assignment_entity_1.Assignment, course_entity_1.Course, cart_entity_1.Cart, student_entity_1.Student, lesson_entity_1.Lesson])],
        controllers: [attachments_controller_1.AttachmentsController],
        providers: [attachments_service_1.AttachmentsService],
    })
], AttachmentsModule);
//# sourceMappingURL=attachments.module.js.map