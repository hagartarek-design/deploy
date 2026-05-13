"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentsModule = void 0;
const common_1 = require("@nestjs/common");
const students_service_1 = require("./students.service");
const students_controller_1 = require("./students.controller");
const typeorm_1 = require("@nestjs/typeorm");
const student_entity_1 = require("./entities/student.entity");
const course_entity_1 = require("../courses/entities/course.entity");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const auth_module_1 = require("../auth/auth.module");
const image_entity_1 = require("../teacher/images/entities/image.entity");
const user_entity_1 = require("../teacher/users/entities/user.entity");
const fileupload_1 = require("../teacher/users/uploads/fileupload");
const exam_entity_1 = require("../teacher/exams/entities/exam.entity");
const userquestion_entity_1 = require("../teacher/userquestion/entities/userquestion.entity");
const smsotp_1 = require("../../common/smsotp");
const student_course_entity_1 = require("../student_course/entities/student_course.entity");
let StudentsModule = class StudentsModule {
};
exports.StudentsModule = StudentsModule;
exports.StudentsModule = StudentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            platform_express_1.MulterModule.register({
                storage: (0, multer_1.diskStorage)({
                    destination: './uploads',
                    filename: (req, file, cb) => {
                        const filename = `${Date.now()}-${file.originalname}`;
                        cb(null, filename);
                    }
                })
            }),
            typeorm_1.TypeOrmModule.forFeature([student_entity_1.Student, course_entity_1.Course, image_entity_1.Image, user_entity_1.User, exam_entity_1.Exam, userquestion_entity_1.Userquestion, student_course_entity_1.StudentCourse]), platform_express_1.MulterModule.register(fileupload_1.multerConfig),
        ],
        controllers: [students_controller_1.StudentsController],
        providers: [students_service_1.StudentsService,
            smsotp_1.twilioService],
    })
], StudentsModule);
//# sourceMappingURL=students.module.js.map