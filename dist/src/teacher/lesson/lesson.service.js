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
exports.LessonService = void 0;
const common_1 = require("@nestjs/common");
const lesson_entity_1 = require("./entities/lesson.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const course_info_entity_1 = require("../../course_info/entities/course_info.entity");
const cart_entity_1 = require("../../cart/entities/cart.entity");
const content_entity_1 = require("../../content/entities/content.entity");
let LessonService = class LessonService {
    constructor(lessons, courseInfo, cartRepo, contentRepo) {
        this.lessons = lessons;
        this.courseInfo = courseInfo;
        this.cartRepo = cartRepo;
        this.contentRepo = contentRepo;
    }
    async addlesson() {
        const lastLesson = await this.lessons.find({
            order: { course_num: 'DESC' },
            take: 1,
        });
        const lastNum = lastLesson[0]?.course_num ?? 0;
        const nextNum = lastNum + 1;
        const createLesson = this.lessons.create({
            name: 'اسم الدرس',
            course_num: nextNum,
        });
        return await this.lessons.save(createLesson);
    }
    async create(createLessonDto) {
        const lesson = await this.lessons.find();
        const lessonsques = await lesson.map((value) => value.question);
        if (lessonsques.includes(createLessonDto.question)) {
            return { success: false, message: "question already exist" };
        }
        const lessons2 = new lesson_entity_1.Lesson();
        return await this.lessons.save({
            question_name: lesson[0].question_name,
            name: lesson[0].name,
            type: createLessonDto.type,
            question: createLessonDto.question,
            answer: createLessonDto.answer
        });
    }
    async getLessonQuestions(id, page = 1, limit = 9) {
        const skip = (page - 1) * limit;
        const getlessons = await this.lessons.findOne({ where: { id: id },
            select: { questions: true }, relations: ['questions']
        });
        getlessons.questions = getlessons.questions?.slice(skip, skip + limit);
        return await getlessons;
    }
    async findAll() {
        return await this.lessons.find();
    }
    async deletelesson(id) {
        return await this.lessons.delete(id);
    }
    async getOrCreateCart(userId) {
        let cart = await this.cartRepo.findOne({
            where: { student: { id: userId },
            }, relations: ['items', 'items.lesson'],
        });
        if (!cart) {
            cart = this.cartRepo.create({ id: userId, });
            cart = await this.cartRepo.save(cart);
        }
        return cart;
    }
    async getSolvedQuestionsPercentBySection(sectionId) {
        const lessons = await this.lessons
            .createQueryBuilder('lesson')
            .leftJoinAndSelect('lesson.content', 'content')
            .leftJoinAndSelect('lesson.questions', 'questions')
            .where('lesson.sectionId = :sectionId', { sectionId })
            .andWhere('content.title = :title', { title: 'واجبات و امتحنات' })
            .getMany();
        if (!lessons.length)
            return 0;
        const allQuestions = lessons.flatMap(lesson => lesson.questions || []);
        if (!allQuestions.length)
            return 0;
        const solvedCount = allQuestions.filter(q => q.solved).length;
        const percent = Math.round((solvedCount / allQuestions.length) * 100);
        return { percent };
    }
    async addalllessonstocart(sectionId) {
        const lessons = await this.lessons.find({ where: { section: { id: sectionId } } });
        const cartItems = lessons.map((lesson) => this.cartRepo.create({
            lesson: { id: lesson.id },
        }));
        await this.cartRepo.save(cartItems);
        return cartItems;
    }
    async lessontype(title, id, sectionId) {
        const course = await this.courseInfo.find({ where: {
                students: { id }, section: { id: sectionId, lesson: { content: { title: title }, } },
            },
            relations: ['section.lesson.content']
        });
        return { course, };
    }
    findOne(id) {
        return `This action returns a #${id} lesson`;
    }
    update(id, updateLessonDto) {
        return `This action updates a #${id} lesson`;
    }
    remove(id) {
        return `This action removes a #${id} lesson`;
    }
};
exports.LessonService = LessonService;
exports.LessonService = LessonService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(lesson_entity_1.Lesson)),
    __param(1, (0, typeorm_1.InjectRepository)(course_info_entity_1.CourseInfo)),
    __param(2, (0, typeorm_1.InjectRepository)(cart_entity_1.Cart)),
    __param(3, (0, typeorm_1.InjectRepository)(content_entity_1.Content)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], LessonService);
//# sourceMappingURL=lesson.service.js.map