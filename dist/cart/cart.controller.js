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
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const cart_service_1 = require("./cart.service");
const create_cart_dto_1 = require("./dto/create-cart.dto");
const update_cart_dto_1 = require("./dto/update-cart.dto");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const course_entity_1 = require("../courses/entities/course.entity");
const auth_guard_1 = require("../common/Gaurds/auth.guard");
(0, common_1.UseGuards)(auth_guard_1.AuthGuard);
let CartController = class CartController {
    constructor(cartService, coursesrepo) {
        this.cartService = cartService;
        this.coursesrepo = coursesrepo;
    }
    async completeCoursePurchase(body) {
        return this.cartService.completeCoursePurchase(body.courseId);
    }
    async createRecharge(body) {
        const merchantRef = 'recharge-' + Date.now();
        const fawryResp = await this.cartService.recharge(merchantRef, body.amount, body.mobile);
        return { merchantRef, fawry: fawryResp };
    }
    async payCart(body) {
        const course = await this.coursesrepo.findOne({
            where: { id: body.courseId },
        });
        if (!course)
            throw new Error('course not found');
        const merchantRef = 'course-' + Date.now();
        course.merchantRef = merchantRef;
        course.status = 'pending';
        await this.coursesrepo.save(course);
        const fawryResp = await this.cartService.createPayment(merchantRef, course.amount, body.mobile);
        if (fawryResp?.fawryRefNumber) {
            course.fawryRefNumber = fawryResp.fawryRefNumber;
            await this.coursesrepo.save(course);
        }
        return { course, fawry: fawryResp };
    }
    create(createCartDto) {
        return this.cartService.create(createCartDto);
    }
    findAll() {
        return this.cartService.findAll();
    }
    attachfromcart(id) {
        return this.cartService.attachfromcart(id);
    }
    findOne(id) {
        return this.cartService.findOne(+id);
    }
    update(id, updateCartDto) {
        return this.cartService.update(+id, updateCartDto);
    }
    remove(id) {
        return this.cartService.remove(+id);
    }
};
exports.CartController = CartController;
__decorate([
    (0, common_1.Post)('complete-course-purchase'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "completeCoursePurchase", null);
__decorate([
    (0, common_1.Post)('create-recharge'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "createRecharge", null);
__decorate([
    (0, common_1.Post)('pay-cart'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "payCart", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cart_dto_1.CreateCartDto]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CartController.prototype, "findAll", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "attachfromcart", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_cart_dto_1.UpdateCartDto]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "remove", null);
exports.CartController = CartController = __decorate([
    (0, common_1.Controller)('cart'),
    __param(1, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __metadata("design:paramtypes", [cart_service_1.CartService,
        typeorm_2.Repository])
], CartController);
//# sourceMappingURL=cart.controller.js.map