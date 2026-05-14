"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseInfoModule = void 0;
const common_1 = require("@nestjs/common");
const course_info_service_1 = require("./course_info.service");
const course_info_controller_1 = require("./course_info.controller");
const typeorm_1 = require("@nestjs/typeorm");
const course_info_entity_1 = require("./entities/course_info.entity");
const course_entity_1 = require("../courses/entities/course.entity");
const lesson_entity_1 = require("../teacher/lesson/entities/lesson.entity");
let CourseInfoModule = class CourseInfoModule {
};
exports.CourseInfoModule = CourseInfoModule;
exports.CourseInfoModule = CourseInfoModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([course_info_entity_1.CourseInfo, course_entity_1.Course, lesson_entity_1.Lesson])],
        controllers: [course_info_controller_1.CourseInfoController],
        providers: [course_info_service_1.CourseInfoService],
    })
], CourseInfoModule);
//# sourceMappingURL=course_info.module.js.map