"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartModule = void 0;
const common_1 = require("@nestjs/common");
const cart_service_1 = require("./cart.service");
const cart_controller_1 = require("./cart.controller");
const typeorm_1 = require("@nestjs/typeorm");
const attachment_entity_1 = require("../attachments/entities/attachment.entity");
const cart_entity_1 = require("./entities/cart.entity");
const student_entity_1 = require("../students/entities/student.entity");
const course_entity_1 = require("../courses/entities/course.entity");
const section_entity_1 = require("../sections/entities/section.entity");
const lesson_entity_1 = require("../teacher/lesson/entities/lesson.entity");
const jwt_1 = require("@nestjs/jwt");
let CartModule = class CartModule {
};
exports.CartModule = CartModule;
exports.CartModule = CartModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([
                lesson_entity_1.Lesson,
                attachment_entity_1.Attachment, cart_entity_1.Cart, student_entity_1.Student, course_entity_1.Course, section_entity_1.Section, student_entity_1.Student
            ])],
        controllers: [cart_controller_1.CartController],
        providers: [cart_service_1.CartService, jwt_1.JwtService],
    })
], CartModule);
//# sourceMappingURL=cart.module.js.map