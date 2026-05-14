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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cart_entity_1 = require("./entities/cart.entity");
const typeorm_2 = require("typeorm");
const attachment_entity_1 = require("../attachments/entities/attachment.entity");
const course_entity_1 = require("../courses/entities/course.entity");
const section_entity_1 = require("../sections/entities/section.entity");
const crypto = require("crypto");
const axios_1 = require("axios");
const student_entity_1 = require("../students/entities/student.entity");
let CartService = class CartService {
    constructor(studentRepo, cartRepository, CourseRepository, attachtRepository, SectionRepository) {
        this.studentRepo = studentRepo;
        this.cartRepository = cartRepository;
        this.CourseRepository = CourseRepository;
        this.attachtRepository = attachtRepository;
        this.SectionRepository = SectionRepository;
        this.merchantCode = process.env.FAWRY_MERCHANT_CODE;
        this.secret = process.env.FAWRY_SECURE_KEY;
        this.endpoint = process.env.FAWRY_BASE_URL;
    }
    create(createCartDto) {
        return 'This action adds a new cart';
    }
    sign(fields) {
        const str = fields.join('') + this.secret;
        return crypto.createHash('sha256').update(str).digest('hex');
    }
    async recharge(merchantRef, amount, customerMobile) {
        const signature = this.sign([this.merchantCode, merchantRef, amount.toFixed(2)]);
        const payload = {
            merchantCode: this.merchantCode,
            merchantRefNumber: merchantRef,
            amount: Number(amount.toFixed(2)),
            customerMobile: customerMobile || '',
            description: 'Order payment',
            signature,
        };
        const url = `${this.endpoint}/Fawry/payments/charge`;
        const res = await axios_1.default.post(url, payload);
        return res.data;
    }
    verifyCallbackSignature(payload, signatureFromFawry) {
        const str = payload.merchantCode + payload.merchantRefNumber + payload.orderId + this.secret;
        const local = crypto.createHash('sha256').update(str).digest('hex');
        return local === signatureFromFawry;
    }
    async createPayment(merchantRef, amount, customerMobile) {
        const paymentMethod = 'PAYATFAWRY';
        const customerProfileId = customerMobile || 'CUST-' + merchantRef;
        const chargeItems = [
            {
                itemId: 'COURSE-' + merchantRef,
                description: 'Physics course payment',
                price: Number(amount.toFixed(2)),
                quantity: 1,
            },
        ];
        const signatureString = `${this.merchantCode}${merchantRef}${customerProfileId}${paymentMethod}${amount}${this.secret}`;
        const signature = crypto.createHash('SHA256').update(signatureString).digest('hex');
        const payload = {
            merchantCode: this.merchantCode,
            merchantRefNum: merchantRef,
            customerProfileId,
            paymentMethod,
            amount: Number(amount.toFixed(2)),
            currencyCode: 'EGP',
            description: 'Course payment',
            customerMobile: customerMobile || '',
            signature,
            chargeItems,
        };
        const url = `${this.endpoint}`;
        try {
            const res = await axios_1.default.post(url, payload, {
                headers: { 'Content-Type': 'application/json' },
            });
            return res.data;
        }
        catch (error) {
            console.error('🔴 Fawry Error:', error.response?.data || error.message);
            throw new Error('Fawry API failed: ' + (error.response?.data?.message || error.message));
        }
    }
    async completeCoursePurchase(courseId) {
        const course = await this.CourseRepository.findOne({ where: { id: courseId } });
        if (!course) {
            throw new Error('Course not found');
        }
        const newAmount = Number(course.amount) - Number(course.price);
        course.amount = newAmount < 0 ? 0 : newAmount;
        if (course.amount === 0) {
            course.status = 'paid';
        }
        await this.CourseRepository.save(course);
        return {
            message: 'Course purchase completed successfully',
            remainingAmount: course.amount,
            status: course.status,
        };
    }
    async attachfromcart(id) {
        const attachment = this.cartRepository.findOne({ where: { id: id } });
        if (!attachment)
            return new common_1.ConflictException("not found attachment");
        const deletecart = this.cartRepository.delete({ id: id });
        return deletecart;
    }
    async findAll() {
        const data = await this.cartRepository.find({
            relations: ['attachment', 'course', 'section', 'lesson'],
        });
        const cleanedData = data.map((item) => ({
            ...item,
            course: item.course || null,
            attachment: item.attachment || null,
            section: item.section || null,
            lesson: item.lesson
        }));
        const attachment = await this.attachtRepository.find({ where: { isUsed: false } });
        const course = await this.CourseRepository.find({ where: { isUsed: false } });
        const section = await this.SectionRepository.find({ where: { isUsed: false } });
        const totalPrice = cleanedData.reduce((sum, e) => {
            const getPrice = (val) => {
                if (Array.isArray(val)) {
                    return val.reduce((s, item) => s + (Number(item?.price) || 0), 0);
                }
                else if (val && typeof val === 'object' && 'price' in val) {
                    return Number(val.price) || 0;
                }
                else {
                    return 0;
                }
            };
            const coursePrice = getPrice(e.course);
            const attachmentPrice = getPrice(e.attachment);
            const sectionPrice = getPrice(e.section);
            const lessonPrice = getPrice(e.lesson);
            return sum + coursePrice + attachmentPrice + sectionPrice + lessonPrice;
        }, 0);
        return {
            data: cleanedData,
            length: totalPrice,
        };
    }
    findOne(id) {
        return `This action returns a #${id} cart`;
    }
    update(id, updateCartDto) {
        return `This action updates a #${id} cart`;
    }
    remove(id) {
        return `This action removes a #${id} cart`;
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(1, (0, typeorm_1.InjectRepository)(cart_entity_1.Cart)),
    __param(2, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __param(3, (0, typeorm_1.InjectRepository)(attachment_entity_1.Attachment)),
    __param(4, (0, typeorm_1.InjectRepository)(section_entity_1.Section)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CartService);
//# sourceMappingURL=cart.service.js.map