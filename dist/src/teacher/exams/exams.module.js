"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamsModule = void 0;
const common_1 = require("@nestjs/common");
const exams_service_1 = require("./exams.service");
const exams_controller_1 = require("./exams.controller");
const typeorm_1 = require("@nestjs/typeorm");
const exam_entity_1 = require("./entities/exam.entity");
const lesson_entity_1 = require("../lesson/entities/lesson.entity");
const image_entity_1 = require("../images/entities/image.entity");
const user_entity_1 = require("../users/entities/user.entity");
const jwt_1 = require("@nestjs/jwt");
const platform_express_1 = require("@nestjs/platform-express");
const fileupload_1 = require("../users/uploads/fileupload");
const attachment_entity_1 = require("../../attachments/entities/attachment.entity");
const auth_service_1 = require("../../auth/auth.service");
const student_entity_1 = require("../../students/entities/student.entity");
let ExamsModule = class ExamsModule {
};
exports.ExamsModule = ExamsModule;
exports.ExamsModule = ExamsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.register(fileupload_1.multerConfig),
            typeorm_1.TypeOrmModule.forFeature([exam_entity_1.Exam, lesson_entity_1.Lesson, image_entity_1.Image, user_entity_1.User, attachment_entity_1.Attachment, student_entity_1.Student])
        ],
        controllers: [exams_controller_1.ExamsController],
        providers: [exams_service_1.ExamsService, jwt_1.JwtService, auth_service_1.AuthService,
        ],
    })
], ExamsModule);
//# sourceMappingURL=exams.module.js.map