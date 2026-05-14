"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseAttendModule = void 0;
const common_1 = require("@nestjs/common");
const course_attend_service_1 = require("./course_attend.service");
const course_attend_controller_1 = require("./course_attend.controller");
const typeorm_1 = require("@nestjs/typeorm");
const course_attend_entity_1 = require("./entities/course_attend.entity");
const course_entity_1 = require("../courses/entities/course.entity");
let CourseAttendModule = class CourseAttendModule {
};
exports.CourseAttendModule = CourseAttendModule;
exports.CourseAttendModule = CourseAttendModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([course_attend_entity_1.CourseAttend, course_entity_1.Course])],
        controllers: [course_attend_controller_1.CourseAttendController],
        providers: [course_attend_service_1.CourseAttendService],
    })
], CourseAttendModule);
//# sourceMappingURL=course_attend.module.js.map