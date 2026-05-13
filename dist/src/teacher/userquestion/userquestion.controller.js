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
exports.UserquestionController = void 0;
const common_1 = require("@nestjs/common");
const userquestion_service_1 = require("./userquestion.service");
const create_userquestion_dto_1 = require("./dto/create-userquestion.dto");
const public_decorator_1 = require("../../../common/decorator/public.decorator");
const typeorm_1 = require("@nestjs/typeorm");
const lesson_entity_1 = require("../lesson/entities/lesson.entity");
const typeorm_2 = require("typeorm");
const userquestion_entity_1 = require("./entities/userquestion.entity");
let UserquestionController = class UserquestionController {
    constructor(userquestionService, lessons, questionrepo) {
        this.userquestionService = userquestionService;
        this.lessons = lessons;
        this.questionrepo = questionrepo;
    }
    async addAnswer(createanswerDto, id) {
        return await this.userquestionService.addAnswer(createanswerDto, id);
    }
    async answerOfQuestion(id, student_answer) {
        console.log(id);
        console.log(student_answer);
        console.log(await this.userquestionService.answerOfQuestion(id, student_answer));
        return await this.userquestionService.answerOfQuestion(id, student_answer);
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
    async answerOfQuestionexam(id, studentAnswerExam) {
        let g = await this.questionrepo.findOne({ where: { id: id } });
        console.log(id);
        console.log(studentAnswerExam);
        console.log(await this.userquestionService.answerOfQuestionexam(id, studentAnswerExam));
        return await this.userquestionService.answerOfQuestionexam(id, studentAnswerExam);
    }
    resultExamAssign(lessonId) {
        return this.userquestionService.resultExamAssign(lessonId);
    }
    findAll(page, limit) {
        return this.userquestionService.findAll(page, limit);
    }
    questions(lessonId, page, limit) {
        return this.userquestionService.questions(lessonId, page, limit);
    }
    lessonques(lessonId, page, limit) {
        return this.userquestionService.lessonques(lessonId, page, limit);
    }
    questionsexams(examId, page, limit) {
        return this.userquestionService.questionsexams(examId, page, limit);
    }
};
exports.UserquestionController = UserquestionController;
__decorate([
    (0, common_1.Post)('/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_userquestion_dto_1.createanswerDto, Object]),
    __metadata("design:returntype", Promise)
], UserquestionController.prototype, "addAnswer", null);
__decorate([
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, common_1.Body)('student_answer')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], UserquestionController.prototype, "answerOfQuestion", null);
__decorate([
    __param(0, (0, common_1.Param)('lessonId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserquestionController.prototype, "getSolvedQuestionsPercentByLesson", null);
__decorate([
    (0, common_1.Patch)('exams/e'),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, common_1.Body)('studentAnswerExam')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], UserquestionController.prototype, "answerOfQuestionexam", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('my/allpercents'),
    __param(0, (0, common_1.Query)('lessonId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserquestionController.prototype, "resultExamAssign", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], UserquestionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('questions'),
    __param(0, (0, common_1.Query)('lessonId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", void 0)
], UserquestionController.prototype, "questions", null);
__decorate([
    (0, common_1.Get)('lesson'),
    __param(0, (0, common_1.Query)('lessonId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", void 0)
], UserquestionController.prototype, "lessonques", null);
__decorate([
    (0, common_1.Get)('questions/questionsexams'),
    __param(0, (0, common_1.Query)('examId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", void 0)
], UserquestionController.prototype, "questionsexams", null);
exports.UserquestionController = UserquestionController = __decorate([
    (0, common_1.Controller)('userquestion'),
    __param(1, (0, typeorm_1.InjectRepository)(lesson_entity_1.Lesson)),
    __param(2, (0, typeorm_1.InjectRepository)(userquestion_entity_1.Userquestion)),
    __metadata("design:paramtypes", [userquestion_service_1.UserquestionService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UserquestionController);
//# sourceMappingURL=userquestion.controller.js.map