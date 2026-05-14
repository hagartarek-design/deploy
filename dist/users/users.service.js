"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const role_entity_1 = require("../role/entities/role.entity");
const user_entity_1 = require("./entities/user.entity");
const user_entity_2 = require("../teacher/users/entities/user.entity");
let UsersService = class UsersService {
    constructor(users, user, jwtService, firebaseAdmin, roleRepository) {
        this.users = users;
        this.user = user;
        this.jwtService = jwtService;
        this.firebaseAdmin = firebaseAdmin;
        this.roleRepository = roleRepository;
    }
    create(createUserDto) {
        return 'This action adds a new users';
    }
    async verifyGoogleToken(idToken) {
        try {
            const decodedToken = await this.firebaseAdmin.auth().verifyIdToken(idToken);
            return {
                email: decodedToken.email,
                name: decodedToken.name,
                uid: decodedToken.sub,
            };
        }
        catch (error) {
            console.error(' Google token verification error:', error);
            throw new Error('Invalid Google token');
        }
    }
    async googleLogin(dto) {
        const { idToken, roles } = dto;
        const { email, name } = await this.verifyGoogleToken(idToken);
        const roleEntity = await this.roleRepository.findOne({
            where: { name: roles },
        });
        if (!roleEntity) {
            throw new common_1.BadRequestException('Invalid role');
        }
        let teacher = await this.user.findOne({ where: { email } });
        if (!teacher) {
            teacher = this.user.create({
                email,
                name,
                provider: 'google',
                role: roles,
            });
            await this.user.save(teacher);
        }
        let user = await this.users.findOne({
            where: { email },
            relations: ['teacher'],
        });
        if (!user) {
            user = this.users.create({
                email,
                name,
                provider: 'google',
                roles: roles,
                teacher: teacher,
            });
        }
        else {
            if (!user.teacher) {
                user.teacher = teacher;
            }
        }
        await this.users.save(user);
        const payload = {
            id: teacher.id,
            email: teacher.email,
            roles: user.roles,
        };
        const token = this.jwtService.sign(payload, {
            secret: process.env.SECRET_KEY,
            expiresIn: '1d',
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.REFRESH_TOKEN,
            expiresIn: '7d',
        });
        user.refreshToken = await bcrypt.hash(refreshToken, 10);
        await this.users.save(user);
        return {
            success: true,
            token,
            refreshtoken: refreshToken,
            userId: user.id,
            teacherId: teacher.id,
        };
    }
    findAll() {
        return `This action returns all users`;
    }
    findOne(id) {
        return `This action returns a #${id} users`;
    }
    update(id, updateUserDto) {
        return `This action updates a #${id} users`;
    }
    remove(id) {
        return `This action removes a #${id} users`;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.Users)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_2.User)),
    __param(3, (0, common_1.Inject)('FIREBASE_ADMIN')),
    __param(4, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService, Object, typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map