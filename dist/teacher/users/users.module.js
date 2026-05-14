"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const users_controller_1 = require("./users.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const platform_express_1 = require("@nestjs/platform-express");
const fileupload_1 = require("./uploads/fileupload");
const jwt_1 = require("@nestjs/jwt");
const image_entity_1 = require("../images/entities/image.entity");
const section_entity_1 = require("../../sections/entities/section.entity");
const course_entity_1 = require("../../courses/entities/course.entity");
const auth_service_1 = require("../../auth/auth.service");
const student_entity_1 = require("../../students/entities/student.entity");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: process.env.SECRET_KEY || 'your_secret_key',
                signOptions: { expiresIn: '1h' },
            }),
            typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.User, image_entity_1.Image, section_entity_1.Section, course_entity_1.Course, student_entity_1.Student
            ]), platform_express_1.MulterModule.register(fileupload_1.multerConfig),
        ],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService, auth_service_1.AuthService
        ],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map