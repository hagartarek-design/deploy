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
exports.CodeService = void 0;
const common_1 = require("@nestjs/common");
const code_entity_1 = require("./entities/code.entity");
const typeorm_1 = require("@nestjs/typeorm");
const student_entity_1 = require("../students/entities/student.entity");
const course_entity_1 = require("../courses/entities/course.entity");
const typeorm_2 = require("typeorm");
const section_entity_1 = require("../sections/entities/section.entity");
const attachment_entity_1 = require("../attachments/entities/attachment.entity");
const cart_entity_1 = require("../cart/entities/cart.entity");
let CodeService = class CodeService {
    constructor(cardRepo, userRepo, courseRepo, sectionRepo, attachmentRepo, cartRepo) {
        this.cardRepo = cardRepo;
        this.userRepo = userRepo;
        this.courseRepo = courseRepo;
        this.sectionRepo = sectionRepo;
        this.attachmentRepo = attachmentRepo;
        this.cartRepo = cartRepo;
    }
    async generateCards(amount, count) {
        const cards = [];
        for (let i = 0; i < count; i++) {
            const rechargeCode = Math.random().toString(36).substring(2, 10).toUpperCase();
            const serial = 'SN-' + Math.random().toString(36).substring(2, 12).toUpperCase();
            const card = this.cardRepo.create({ rechargeCode, serial, amount });
            await this.cardRepo.save(card);
            cards.push(card);
        }
        return cards;
    }
    async codes(page = 1, limit = 9) {
        const skip = (page - 1) * limit;
        const codes = await this.cardRepo.find({ skip,
            take: limit, where: { isUsed: true } });
        return { message: 'codes  returned successfully', codes };
    }
    async rechargeCard(userId, rechargeCode, amount) {
        const card = await this.cardRepo.findOne({ where: { rechargeCode } });
        if (!card)
            throw new common_1.ConflictException('wrong card num');
        if (card.isUsed)
            throw new common_1.ConflictException('card already used');
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user)
            throw new common_1.ConflictException('user not found');
        user.balance += amount;
        card.balance = user.balance;
        card.isUsed = true;
        card.amount = amount;
        await this.cardRepo.save(card);
        await this.userRepo.save(user);
        return {
            success: true,
            message: 'recharged successfully✅',
            added: amount,
            totalBalance: user.balance,
            code: card.rechargeCode,
        };
    }
    async buyCourse(userId, courseId) {
        const user = await this.userRepo.findOne({
            where: { id: userId },
            relations: ['courses'],
        });
        if (!user)
            throw new common_1.ConflictException('user not exist');
        const course = await this.courseRepo.findOne({ where: { id: courseId } });
        if (!course)
            throw new common_1.ConflictException('course not found');
        const already = user.courses.some(c => c.id === course.id);
        if (already)
            throw new common_1.ConflictException('course already exist');
        if (user.balance < course.price) {
            throw new common_1.ConflictException('no enough balance');
        }
        user.balance -= course.price;
        user.courses.push(course);
        await this.userRepo.save(user);
        return {
            success: true,
            message: 'course successfully paid ',
            paid: course.price,
            remainingBalance: user.balance,
        };
    }
    async buySection(userId, sectionId) {
        const user = await this.userRepo.findOne({
            where: { id: userId },
            relations: ['sections'],
        });
        if (!user)
            throw new common_1.ConflictException('user not exist');
        const sections = await this.sectionRepo.findOne({ where: { id: sectionId } });
        if (!sections)
            throw new common_1.ConflictException('sections not found');
        const already = user.sections.some(a => a.id === sections.id);
        if (already)
            throw new common_1.ConflictException('sections already exist');
        if (user.balance < sections.price) {
            throw new common_1.ConflictException('no enough balance');
        }
        user.balance -= sections.price;
        sections.isUsed = true;
        await this.userRepo.save(user);
        await this.sectionRepo.save(sections);
        if (sections.isUsed == true) {
            return new common_1.ConflictException("already bought");
        }
        return {
            success: true,
            message: 'course successfully paid ',
            paid: sections.price,
            remainingBalance: user.balance, isUsed: sections.isUsed
        };
    }
    async clearcart(userId) {
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user)
            return new common_1.ConflictException('user not exist');
        return await this.cartRepo.clear();
    }
    async buySheet(userId) {
        const user = await this.userRepo.findOne({
            where: { id: userId },
            relations: ['attachments'],
        });
        if (!user)
            throw new common_1.ConflictException('User does not exist');
        const cartItems = await this.cartRepo.find({
            where: { student: { id: userId } },
            relations: ['attachment'],
        });
        if (cartItems.length === 0) {
            throw new common_1.ConflictException('Cart is empty');
        }
        const alreadyOwnedIds = user.attachments.map(a => a.id);
        const attachmentsToBuy = cartItems
            .map(item => item.attachment)
            .filter(attachment => !alreadyOwnedIds.includes(attachment.id));
        if (attachmentsToBuy.length === 0) {
            throw new common_1.ConflictException('All items in cart are already owned');
        }
        const totalCost = attachmentsToBuy.reduce((sum, a) => sum + a.price, 0);
        if (user.walletBalance < totalCost) {
            throw new common_1.ConflictException('Not enough wallet balance');
        }
        user.walletBalance -= totalCost;
        await this.userRepo.save(user);
        await this.cartRepo.clear();
        return {
            success: true,
            message: 'All attachments successfully purchased',
            paid: totalCost,
            remainingBalance: user.walletBalance,
            attachmentsBought: attachmentsToBuy.map(a => ({
                id: a.id,
                price: a.price,
            })),
        };
    }
    create(createCodeDto) {
        return 'This action adds a new code';
    }
    findAll() {
        return `This action returns all code`;
    }
    findOne(id) {
        return `This action returns a #${id} code`;
    }
    update(id, updateCodeDto) {
        return `This action updates a #${id} code`;
    }
    remove(id) {
        return `This action removes a #${id} code`;
    }
};
exports.CodeService = CodeService;
exports.CodeService = CodeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(code_entity_1.Code)),
    __param(1, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(2, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __param(3, (0, typeorm_1.InjectRepository)(section_entity_1.Section)),
    __param(4, (0, typeorm_1.InjectRepository)(attachment_entity_1.Attachment)),
    __param(5, (0, typeorm_1.InjectRepository)(cart_entity_1.Cart)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CodeService);
//# sourceMappingURL=code.service.js.map