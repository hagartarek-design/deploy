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
exports.LessonController = void 0;
const common_1 = require("@nestjs/common");
const lesson_service_1 = require("./lesson.service");
const create_lesson_dto_1 = require("./dto/create-lesson.dto");
const update_lesson_dto_1 = require("./dto/update-lesson.dto");
const typeorm_1 = require("@nestjs/typeorm");
const userquestion_entity_1 = require("../userquestion/entities/userquestion.entity");
const typeorm_2 = require("typeorm");
const content_entity_1 = require("../../content/entities/content.entity");
const lesson_entity_1 = require("./entities/lesson.entity");
const section_entity_1 = require("../../sections/entities/section.entity");
const public_decorator_1 = require("../../../common/decorator/public.decorator");
let LessonController = class LessonController {
    constructor(lessonService, userquestion, contentRepo, lessonRepo, lessons, sectionRepo) {
        this.lessonService = lessonService;
        this.userquestion = userquestion;
        this.contentRepo = contentRepo;
        this.lessonRepo = lessonRepo;
        this.lessons = lessons;
        this.sectionRepo = sectionRepo;
    }
    create(createLessonDto) {
        return this.lessonService.create(createLessonDto);
    }
    findAll() {
        console.log(this.lessonService.findAll());
        return this.lessonService.findAll();
    }
    lessontype(title, req, sectionId) {
        return this.lessonService.lessontype(title, req['student'].id, sectionId);
    }
    async getLessonQuestions(id, page, limit) {
        console.log('page', page);
        console.log('limit', limit);
        return await this.lessonService.getLessonQuestions(id, page, limit);
    }
    async deletelesson(id) {
        return await this.lessonService.deletelesson(id);
    }
    async addlesson() {
        return await this.lessonService.addlesson();
    }
    async addalllessonstocart(sectionId) {
        return await this.lessonService.addalllessonstocart(sectionId);
    }
    async getSolvedPercent(sectionId) {
        return await this.lessonService.getSolvedQuestionsPercentBySection(sectionId);
    }
    async getSolvedQuestionsPercentByLesson(lessonId) {
        const lesson = await this.lessons.findOne({
            where: { id: lessonId },
            relations: ['content', 'questions'],
        });
        if (!lesson)
            return { percent: 0 };
        const hasRequiredContent = lesson.content?.some(c => c.title === 'واجبات و امتحنات');
        if (!hasRequiredContent)
            return { percent: 0 };
        const questions = lesson.questions || [];
        if (!questions.length) {
            lesson.percentageAnswer = 0;
            await this.lessons.save(lesson);
            return { lessonId, percent: 0 };
        }
        const solvedCount = questions.filter(q => Number(q.solved) === 1).length;
        const percent = Math.round((solvedCount / questions.length) * 100);
        lesson.percentageAnswer = percent;
        await this.lessons.save(lesson);
        return { lessonId, percent };
    }
    findOne(id) {
        return this.lessonService.findOne(+id);
    }
    update(id, updateLessonDto) {
        return this.lessonService.update(+id, updateLessonDto);
    }
    remove(id) {
        return this.lessonService.remove(+id);
    }
    async getLessonViewPercent(lessonId) {
        const lesson = await this.lessons.findOne({
            where: { id: lessonId },
            relations: ['content'],
        });
        if (!lesson)
            return { lessonId, percent: 0 };
        const hasLectureContent = lesson.content?.some(c => c.title === 'المحاضرات');
        if (!hasLectureContent)
            return { lessonId, percent: 0 };
        const percent = lesson.viewedCount > 0 ? 50 : 0;
        lesson.viewPercent = percent;
        await this.lessons.save(lesson);
        return { lessonId, percent };
    }
    async markVideoWatched(lessonId) {
        const lesson = await this.
            lessonRepo.findOne({
            where: { id: lessonId },
            relations: ['section', 'content']
        });
        if (!lesson)
            throw new common_1.NotFoundException('Lesson not found');
        if (!lesson.content?.some(c => c.title === 'المحاضرات'))
            return { message: 'Not a lecture video' };
        if (!lesson.viewedCount)
            lesson.viewedCount = 0;
        if (lesson.viewedCount == 0 || lesson.viewedCount == null)
            lesson.viewedCount += 1;
        await this.lessonRepo.save(lesson);
        await this.getLessonViewPercent(lessonId);
        const g = await this.getLessonViewPercent(lessonId);
        return {
            g,
            message: 'Video marked as watched automatically'
        };
    }
};
exports.LessonController = LessonController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_lesson_dto_1.CreateLessonDto]),
    __metadata("design:returntype", void 0)
], LessonController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LessonController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('typelesson'),
    __param(0, (0, common_1.Query)('title')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Query)('sectionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Number]),
    __metadata("design:returntype", void 0)
], LessonController.prototype, "lessontype", null);
__decorate([
    (0, common_1.Get)('lessonquestions/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], LessonController.prototype, "getLessonQuestions", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LessonController.prototype, "deletelesson", null);
__decorate([
    (0, common_1.Post)('/addLesson'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LessonController.prototype, "addlesson", null);
__decorate([
    (0, common_1.Post)('/addLessonstocart/:sectionId'),
    __param(0, (0, common_1.Param)('sectionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LessonController.prototype, "addalllessonstocart", null);
__decorate([
    (0, common_1.Get)('solved-percent/:sectionId'),
    __param(0, (0, common_1.Param)('sectionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LessonController.prototype, "getSolvedPercent", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('lessonspercent/:lessonId'),
    __param(0, (0, common_1.Param)('lessonId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LessonController.prototype, "getSolvedQuestionsPercentByLesson", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LessonController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_lesson_dto_1.UpdateLessonDto]),
    __metadata("design:returntype", void 0)
], LessonController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LessonController.prototype, "remove", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('lesson/:lessonId/watched'),
    __param(0, (0, common_1.Param)('lessonId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LessonController.prototype, "markVideoWatched", null);
exports.LessonController = LessonController = __decorate([
    (0, common_1.Controller)('lesson'),
    __param(1, (0, typeorm_1.InjectRepository)(userquestion_entity_1.Userquestion)),
    __param(2, (0, typeorm_1.InjectRepository)(content_entity_1.Content)),
    __param(3, (0, typeorm_1.InjectRepository)(lesson_entity_1.Lesson)),
    __param(4, (0, typeorm_1.InjectRepository)(lesson_entity_1.Lesson)),
    __param(5, (0, typeorm_1.InjectRepository)(section_entity_1.Section)),
    __metadata("design:paramtypes", [lesson_service_1.LessonService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], LessonController);
//# sourceMappingURL=lesson.controller.js.map