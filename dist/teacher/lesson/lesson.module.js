"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonModule = void 0;
const common_1 = require("@nestjs/common");
const lesson_service_1 = require("./lesson.service");
const lesson_controller_1 = require("./lesson.controller");
const typeorm_1 = require("@nestjs/typeorm");
const lesson_entity_1 = require("./entities/lesson.entity");
const userquestion_entity_1 = require("../userquestion/entities/userquestion.entity");
const section_entity_1 = require("../../sections/entities/section.entity");
const content_entity_1 = require("../../content/entities/content.entity");
const course_info_entity_1 = require("../../course_info/entities/course_info.entity");
const pdf_entity_1 = require("../../pdf/entities/pdf.entity");
const cart_entity_1 = require("../../cart/entities/cart.entity");
let LessonModule = class LessonModule {
};
exports.LessonModule = LessonModule;
exports.LessonModule = LessonModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([
                cart_entity_1.Cart, lesson_entity_1.Lesson, content_entity_1.Content, userquestion_entity_1.Userquestion, section_entity_1.Section, course_info_entity_1.CourseInfo, pdf_entity_1.Pdf
            ])],
        controllers: [lesson_controller_1.LessonController],
        providers: [lesson_service_1.LessonService],
    })
], LessonModule);
//# sourceMappingURL=lesson.module.js.map