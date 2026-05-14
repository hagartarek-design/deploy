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
exports.AttachmentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const attachment_entity_1 = require("./entities/attachment.entity");
const typeorm_2 = require("typeorm");
const course_entity_1 = require("../courses/entities/course.entity");
const cart_entity_1 = require("../cart/entities/cart.entity");
const student_entity_1 = require("../students/entities/student.entity");
const lesson_entity_1 = require("../teacher/lesson/entities/lesson.entity");
let AttachmentsService = class AttachmentsService {
    constructor(attatchRepository, courseRepository, cartRepository, studentRepository, lessonRepository) {
        this.attatchRepository = attatchRepository;
        this.courseRepository = courseRepository;
        this.cartRepository = cartRepository;
        this.studentRepository = studentRepository;
        this.lessonRepository = lessonRepository;
    }
    create(createAttachmentDto) {
        const newAttachment = this.attatchRepository.create(createAttachmentDto);
        return this.attatchRepository.save(newAttachment);
    }
    async addlessontocart(userId, lessonId) {
        const user = await this.studentRepository.findOne({ where: { id: userId }, relations: ['lesson'] });
        const lesson = await this.lessonRepository.findOne({ where: { id: lessonId } });
        if (!lesson) {
            return new common_1.ConflictException('no lesson found');
        }
        const alreadyOwned = user.lesson.some(a => a.id === lessonId);
        if (alreadyOwned) {
            throw new common_1.ConflictException('User already owns this lesson');
        }
        const existingCartItem = await this.cartRepository.findOne({
            where: {
                student: { id: userId },
                lesson: { id: lessonId },
            },
            relations: ['lesson'],
        });
        if (existingCartItem) {
            throw new common_1.ConflictException('Item already in cart');
        }
        const newCartItem = this.cartRepository.create({
            student: user,
            lesson: lesson,
        });
        const savedItem = await this.cartRepository.save(newCartItem);
        return {
            success: true,
            message: 'lesson added to cart successfully',
            cartItem: {
                lesson: {
                    id: savedItem.lesson.id,
                    price: savedItem.lesson.price,
                },
            },
        };
    }
    async addToCart(userId, attachmentId) {
        const user = await this.studentRepository.findOne({
            where: { id: userId },
            relations: ['attachments'],
        });
        if (!user)
            throw new common_1.ConflictException('User does not exist');
        const attachment = await this.attatchRepository.findOne({
            where: { id: attachmentId },
        });
        if (!attachment)
            throw new common_1.ConflictException('Attachment does not exist');
        const alreadyOwned = user.attachments.some(a => a.id === attachmentId);
        if (alreadyOwned) {
            throw new common_1.ConflictException('User already owns this attachment');
        }
        const existingCartItem = await this.cartRepository.findOne({
            where: {
                student: { id: userId },
                attachment: { id: attachmentId },
            },
            relations: ['attachment'],
        });
        if (existingCartItem) {
            throw new common_1.ConflictException('Item already in cart');
        }
        const newCartItem = this.cartRepository.create({
            student: user,
            attachment: attachment,
        });
        const savedItem = await this.cartRepository.save(newCartItem);
        return {
            success: true,
            message: 'Attachment added to cart successfully',
            cartItem: {
                attachment: {
                    id: savedItem.attachment.id,
                    price: savedItem.attachment.price,
                },
            },
        };
    }
    async findused() {
        const used = await this.attatchRepository.find({ where: { isUsed: true } });
        if (!used)
            return new common_1.ConflictException('not found ');
        return used;
    }
    async findunused() {
        const used = await this.attatchRepository.find({ where: { isUsed: false } });
        if (!used)
            return new common_1.ConflictException('not found ');
        return used;
    }
    async findAll(status) {
        const course = await this.attatchRepository.find({ where: { status: status }, relations: ["assignments", "exam"] });
        const courses = course.map((e) => ({ ...e, assignmentCount: e.assignments ? e.assignments.length : 0,
            examCount: e.exam ? e.exam.length : 0,
            totalExamAssignment: (e.assignments ? e.assignments.length : 0) + (e.exam ? e.exam.length : 0)
        }));
        const course2 = await this.attatchRepository.find({ where: { status: status } });
        return { courses };
    }
    async findbyonline() {
        return await this.attatchRepository.find();
    }
    async findbyoffline() {
        return await this.attatchRepository.find();
    }
    findOne(id) {
        return `This action returns a #${id} attachment`;
    }
    update(id, updateAttachmentDto) {
        return `This action updates a #${id} attachment`;
    }
    remove(id) {
        return `This action removes a #${id} attachment`;
    }
};
exports.AttachmentsService = AttachmentsService;
exports.AttachmentsService = AttachmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(attachment_entity_1.Attachment)),
    __param(1, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __param(2, (0, typeorm_1.InjectRepository)(cart_entity_1.Cart)),
    __param(3, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(4, (0, typeorm_1.InjectRepository)(lesson_entity_1.Lesson)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AttachmentsService);
//# sourceMappingURL=attachments.service.js.map