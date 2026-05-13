"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserquestionModule = void 0;
const common_1 = require("@nestjs/common");
const userquestion_service_1 = require("./userquestion.service");
const userquestion_controller_1 = require("./userquestion.controller");
const typeorm_1 = require("@nestjs/typeorm");
const userquestion_entity_1 = require("./entities/userquestion.entity");
const lesson_entity_1 = require("../lesson/entities/lesson.entity");
const student_entity_1 = require("../../students/entities/student.entity");
let UserquestionModule = class UserquestionModule {
};
exports.UserquestionModule = UserquestionModule;
exports.UserquestionModule = UserquestionModule = __decorate([
    (0, common_1.Module)({ imports: [typeorm_1.TypeOrmModule.forFeature([
                userquestion_entity_1.Userquestion, lesson_entity_1.Lesson, student_entity_1.Student
            ])],
        controllers: [userquestion_controller_1.UserquestionController],
        providers: [userquestion_service_1.UserquestionService,],
    })
], UserquestionModule);
//# sourceMappingURL=userquestion.module.js.map