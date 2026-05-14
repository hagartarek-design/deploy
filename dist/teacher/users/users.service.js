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
const user_entity_1 = require("./entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const image_entity_1 = require("../images/entities/image.entity");
const section_entity_1 = require("../../sections/entities/section.entity");
const course_entity_1 = require("../../courses/entities/course.entity");
let UsersService = class UsersService {
    constructor(user, imageRepository, sectionRepository, courseRepository) {
        this.user = user;
        this.imageRepository = imageRepository;
        this.sectionRepository = sectionRepository;
        this.courseRepository = courseRepository;
    }
    async getallimages(userId) {
        return await this.imageRepository.find({ where: { user: { id: userId } } });
    }
    async deleteimage(userId, id) {
        return await this.imageRepository.delete({ user: { id: userId }, id: id });
    }
    async getimagebyid(userId, id) {
        return await this.imageRepository.findOneBy({ user: { id: userId }, id: id });
    }
    async getLastImage(userId) {
        return await this.imageRepository.findOne({
            where: { user: { id: userId } },
            order: { id: 'DESC' },
            relations: ['user'],
        });
    }
    async handleFileUpload(id, file) {
        try {
            if (!file) {
                return new common_1.BadRequestException('No file uploaded');
            }
            const user = await this.user.findOne({ where: { id, }, relations: ['images'] });
            if (!user) {
                return new common_1.ForbiddenException('User not found');
            }
            user.image = file.path;
            const newImage = this.imageRepository.create({
                url: file.path,
                user: user,
            });
            await this.imageRepository.save(newImage);
            user.images.push(newImage);
            await this.user.save(user);
            return { message: 'File uploaded successfully', imagePath: user.image, };
        }
        catch (e) {
            console.log(e);
            return e;
        }
    }
    async uploadFile(id, file, createSectionDto) {
        try {
            if (!file) {
                throw new common_1.BadRequestException('No file uploaded');
            }
            const user = await this.user.findOne({ where: { id }, relations: ['section'] });
            if (!user) {
                throw new common_1.ForbiddenException('User not found');
            }
            user.cardimg = file.path;
            const newSection = this.sectionRepository.create({
                cardimg: file.path,
                name: createSectionDto.name,
                price: createSectionDto.price,
                viewingWatching: createSectionDto.viewingWatching,
                description: "sadde",
                course: this.courseRepository.create({ id: 2 }),
                userId: user,
            });
            await this.sectionRepository.save(newSection);
            user.section.push(newSection);
            await this.user.save(user);
            return {
                message: 'File uploaded successfully',
                imagePath: user.cardimg,
                section: newSection,
            };
        }
        catch (e) {
            console.error(e);
            throw new common_1.BadRequestException('Failed to upload file');
        }
    }
    findAll(id) {
        return this.user.findOne({ where: { id } });
    }
    async deleteUser(id) {
        const result = await this.user.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`User with ID ${id} not fond`);
        }
    }
    async deleteUserByAuth(userId, loggedInUserId) {
        if (userId !== loggedInUserId) {
            throw new common_1.ForbiddenException("You can't delete another user's account");
        }
        await this.deleteUser(userId);
    }
    async softDeleteUser(id) {
        const result = await this.user.softDelete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
    }
    async deleteAccount(userId) {
        const user = await this.user.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        await this.user.softDelete(userId);
    }
    async restoreAccount(userId) {
        await this.user.restore(userId);
    }
    async freezeAccount(userId) {
        const user = await this.user.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        user.isActive = false;
        await this.user.save(user);
    }
    async unfreezeAccount(userId) {
        const user = await this.user.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        user.isActive = true;
        await this.user.save(user);
    }
    async userInputInfo(userId, newEmail, fullname, phone) {
        const user = await this.user.findOne({ where: { id: userId, } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const emailExists = await this.user.findOne({ where: { email: newEmail, fullname: fullname, phone: phone }, });
        if (emailExists) {
            throw new common_1.ConflictException('Email is already in use');
        }
        user.email = newEmail;
        return await this.user.save(user);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(image_entity_1.Image)),
    __param(2, (0, typeorm_1.InjectRepository)(section_entity_1.Section)),
    __param(3, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map