"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModules = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const users_controller_1 = require("./users.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../teacher/users/entities/user.entity");
const user_entity_2 = require("./entities/user.entity");
const student_entity_1 = require("../students/entities/student.entity");
const jwt_1 = require("@nestjs/jwt");
const googleauthservice_1 = require("../auth/googleauthservice");
const role_entity_1 = require("../role/entities/role.entity");
const config_1 = require("@nestjs/config");
let UsersModules = class UsersModules {
};
exports.UsersModules = UsersModules;
exports.UsersModules = UsersModules = __decorate([
    (0, common_1.Module)({
        exports: [jwt_1.JwtModule],
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true, }),
            jwt_1.JwtModule.register({
                secret: process.env.SECRET_KEY || 'your_secret_key',
                signOptions: { expiresIn: '1h' },
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, user_entity_2.Users, student_entity_1.Student, role_entity_1.Role])
        ],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService, googleauthservice_1.GoogleAuthService],
    })
], UsersModules);
//# sourceMappingURL=users.module.js.map