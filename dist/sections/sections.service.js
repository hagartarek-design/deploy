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
exports.SectionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const section_entity_1 = require("./entities/section.entity");
const typeorm_2 = require("typeorm");
const student_entity_1 = require("../students/entities/student.entity");
const cart_entity_1 = require("../cart/entities/cart.entity");
const auth_guard_1 = require("../common/Gaurds/auth.guard");
let SectionsService = class SectionsService {
    constructor(sectionrepository, cartrepository, Studentrepository) {
        this.sectionrepository = sectionrepository;
        this.cartrepository = cartrepository;
        this.Studentrepository = Studentrepository;
    }
    async addToCart(userId, sectionid) {
        const user = await this.Studentrepository.findOne({
            where: { id: userId },
            relations: ['sections'],
        });
        if (!user)
            throw new common_1.ConflictException('User does not exist');
        const course = await this.sectionrepository.findOne({
            where: { id: sectionid },
        });
        if (!course)
            throw new common_1.ConflictException('course does not exist');
        const alreadyOwned = user.sections.some(a => a.id === sectionid);
        if (alreadyOwned) {
            throw new common_1.ConflictException('User already owns this course');
        }
        const existingCartItem = await this.cartrepository.findOne({
            where: {
                student: { id: userId },
                section: { id: sectionid },
            },
            relations: ['section'],
        });
        if (existingCartItem) {
            throw new common_1.ConflictException('Item already in cart');
        }
        const newCartItem = this.cartrepository.create({
            student: user,
            section: course,
        });
        const savedItem = await this.cartrepository.save(newCartItem);
        return {
            success: true,
            message: 'course added to cart successfully',
            cartItem: {
                course: {
                    id: savedItem.section.id,
                    price: savedItem.section.price,
                },
            },
        };
    }
    async payWithCode(id, code, sectionId) {
        const courseCode = await this.sectionrepository.findOne({
            where: {
                student: { id },
                code,
                id: sectionId
            },
            relations: ['student']
        });
        if (!courseCode) {
            throw new common_1.NotFoundException('wrong code');
        }
        if (courseCode.isUsed) {
            throw new common_1.BadRequestException('course already purchased');
        }
        const coursePrice = await this.getSectionPrice(sectionId);
        const students = courseCode.student;
        if (students.walletBalance < coursePrice) {
            throw new common_1.BadRequestException('not enoughh balance');
        }
        students.walletBalance -= coursePrice;
        await this.Studentrepository.save(students);
        await this.Studentrepository.save({
            id: id,
            sectionId: sectionId,
            purchaseDate: new Date(),
            amountPaid: coursePrice
        });
        courseCode.isUsed = true;
        await this.sectionrepository.save(courseCode);
        return {
            message: 'your payment success',
            sectionId: sectionId,
            remainingBalance: students.balance,
            amountPaid: coursePrice
        };
    }
    async getSectionPrice(sectionId) {
        const course = await this.sectionrepository.findOne({
            where: { id: sectionId },
            select: ['price']
        });
        if (!course) {
            throw new common_1.NotFoundException('الكورس غير موجود');
        }
        return course.price;
    }
    async isEnrolled(id, sectionId) {
        const section = await this.sectionrepository.findOne({
            where: { student: { id }, id: sectionId },
        });
        if (section && section.isUsed === true) {
            return true;
        }
        else {
            return false;
        }
    }
    async savesection(createSectionDto, userId) {
        return await this.sectionrepository.save({ course: createSectionDto.course,
            user: userId, description: createSectionDto.description,
            name: createSectionDto.name,
            viewingWatching: createSectionDto.
                viewingWatching, price: createSectionDto.price
        });
    }
    async mysections() {
        return await this.sectionrepository.find({ where: { isUsed: true } });
    }
    async withpaginatingsections(userId, offset, limit) {
        return await this.sectionrepository.find({ where: { userId: userId }, skip: offset, take: limit, });
    }
    async allsections(userId) {
        return await this.sectionrepository.find(userId);
    }
    remove(id, userId) {
        return this.sectionrepository.delete({ id, userId });
    }
};
exports.SectionsService = SectionsService;
exports.SectionsService = SectionsService = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(section_entity_1.Section)),
    __param(1, (0, typeorm_1.InjectRepository)(cart_entity_1.Cart)),
    __param(2, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SectionsService);
//# sourceMappingURL=sections.service.js.map