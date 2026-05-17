"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesModule = void 0;
const common_1 = require("@nestjs/common");
const courses_service_1 = require("./courses.service");
const courses_controller_1 = require("./courses.controller");
const typeorm_1 = require("@nestjs/typeorm");
const course_entity_1 = require("./entities/course.entity");
const student_entity_1 = require("../students/entities/student.entity");
const event_entity_1 = require("../teacher/events/entities/event.entity");
const course_attend_entity_1 = require("../course_attend/entities/course_attend.entity");
const exam_entity_1 = require("../teacher/exams/entities/exam.entity");
const course_info_entity_1 = require("../course_info/entities/course_info.entity");
const section_entity_1 = require("../sections/entities/section.entity");
const lesson_entity_1 = require("../teacher/lesson/entities/lesson.entity");
const studentquestion_entity_1 = require("../studentquestions/entities/studentquestion.entity");
const cart_entity_1 = require("../cart/entities/cart.entity");
const jwt_1 = require("@nestjs/jwt");
let CoursesModule = class CoursesModule {
};
exports.CoursesModule = CoursesModule;
exports.CoursesModule = CoursesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([cart_entity_1.Cart, course_entity_1.Course, student_entity_1.Student, event_entity_1.Event, course_attend_entity_1.CourseAttend, exam_entity_1.Exam, course_info_entity_1.CourseInfo, section_entity_1.Section, lesson_entity_1.Lesson, studentquestion_entity_1.Studentquestion])],
        controllers: [courses_controller_1.CoursesController],
        providers: [courses_service_1.CoursesService, jwt_1.JwtService],
    })
], CoursesModule);
//# sourceMappingURL=courses.module.js.map