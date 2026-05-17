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
exports.PdfController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path = require("path");
const pdf_service_1 = require("./pdf.service");
const typeorm_1 = require("@nestjs/typeorm");
const lesson_entity_1 = require("../teacher/lesson/entities/lesson.entity");
const typeorm_2 = require("typeorm");
const section_entity_1 = require("../sections/entities/section.entity");
const public_decorator_1 = require("../common/decorator/public.decorator");
let PdfController = class PdfController {
    constructor(pdfService, lessonRepo, sectionRepo) {
        this.pdfService = pdfService;
        this.lessonRepo = lessonRepo;
        this.sectionRepo = sectionRepo;
    }
    async uploadPdf(lessonId, file) {
        const pdfPath = file.path;
        const outputDir = path.join(__dirname, '..', '..', 'uploads', 'pdf-images');
        const images = await this.pdfService.convertPdfToImages(pdfPath, outputDir);
        const lesson = await this.pdfService.savePdfImages(lessonId, file.filename, images);
        if (!lesson.pdfViews || lesson.pdfViews.length !== images.length) {
            lesson.pdfViews = Array(images.length).fill(0);
            await this.lessonRepo.save(lesson);
            await this.lessonRepo.save(lesson);
        }
        console.log('pdfViews:', lesson.pdfViews);
        return {
            lessonId: lesson.id,
            pdf: file.filename,
            images,
            lesson,
        };
    }
    async getSectionPdfPercent(sectionId) {
        const lessons = await this.lessonRepo.find({
            where: { section: { id: sectionId } },
            relations: ['content'],
        });
        const pdfLessons = lessons.filter((lesson) => lesson.content &&
            lesson.content.some((c) => c.title === 'pdf'));
        if (pdfLessons.length === 0) {
            return { sectionId, percent: 0, totalPages: 0, viewedPages: 0 };
        }
        let totalPages = 0;
        let viewedPages = 0;
        for (const lesson of pdfLessons) {
            if (!lesson.pdfImages || lesson.pdfImages.length === 0)
                continue;
            totalPages += lesson.pdfImages.length;
            if (!lesson.pdfViews || lesson.pdfViews.length !== lesson.pdfImages.length) {
                lesson.pdfViews = Array(lesson.pdfImages.length).fill(0);
                await this.lessonRepo.save(lesson);
            }
            viewedPages += lesson.pdfViews.reduce((a, b) => a + b, 0);
        }
        const percent = totalPages === 0 ? 0 : Math.round((viewedPages / totalPages) * 100);
        return {
            sectionId,
            percent,
            totalPages,
            viewedPages,
        };
    }
    async getlessonsection(sectionId) {
        const lessons = await this.lessonRepo.find({
            where: { section: { id: sectionId } },
            relations: ['content'],
        });
        const pdfLessons = lessons.filter((lesson) => lesson.content &&
            lesson.content.some((c) => c.title === 'pdf'));
        if (pdfLessons.length === 0) {
            return { sectionId, percent: 0, totalPages: 0, viewedPages: 0 };
        }
        let totalPages = 0;
        let viewedPages = 0;
        for (const lesson of pdfLessons) {
            if (!lesson.pdfImages || lesson.pdfImages.length === 0)
                continue;
            totalPages += lesson.pdfImages.length;
            if (!lesson.pdfViews || lesson.pdfViews.length !== lesson.pdfImages.length) {
                lesson.pdfViews = Array(lesson.pdfImages.length).fill(0);
                await this.lessonRepo.save(lesson);
            }
            viewedPages += lesson.pdfViews.reduce((a, b) => a + b, 0);
        }
        const percent = totalPages === 0 ? 0 : Math.round((viewedPages / totalPages) * 100);
        return {
            sectionId,
            percent,
            totalPages,
            viewedPages,
        };
    }
    async getLessonPdfPercent(lessonId) {
        const lesson = await this.lessonRepo.findOne({
            where: { id: lessonId },
            relations: ['content'],
        });
        if (!lesson) {
            return { lessonId, percent: 0, totalPages: 0, viewedPages: 0 };
        }
        const hasPdfContent = lesson.content &&
            lesson.content.some((c) => c.title === 'pdf');
        if (!hasPdfContent) {
            return { lessonId, percent: 0, totalPages: 0, viewedPages: 0 };
        }
        if (!lesson.pdfImages || lesson.pdfImages.length === 0) {
            return { lessonId, percent: 0, totalPages: 0, viewedPages: 0 };
        }
        const totalPages = lesson.pdfImages.length;
        if (!lesson.pdfViews || lesson.pdfViews.length !== totalPages) {
            lesson.pdfViews = Array(totalPages).fill(0);
            await this.lessonRepo.save(lesson);
        }
        const viewedPages = lesson.pdfViews.reduce((a, b) => a + b, 0);
        const percent = totalPages === 0 ? 0 : Math.round((viewedPages / totalPages) * 100);
        return {
            lessonId,
            percent,
            totalPages,
            viewedPages,
        };
    }
    async getSolvedQuestionsPercentBySection(sectionId) {
        const lessons = await this.lessonRepo
            .createQueryBuilder('lesson')
            .leftJoinAndSelect('lesson.content', 'content')
            .leftJoinAndSelect('lesson.questions', 'questions')
            .where('lesson.sectionId = :sectionId', { sectionId })
            .andWhere('content.title = :title', { title: 'واجبات و امتحنات' })
            .getMany();
        if (!lessons.length)
            return { percent: 0 };
        const allQuestions = lessons.flatMap(l => l.questions || []);
        if (!allQuestions.length)
            return { percent: 0 };
        const solved = allQuestions.filter(q => q.solved).length;
        const percent = Math.round((solved / allQuestions.length) * 100);
        return { percent };
    }
    async getFullSectionProgress(sectionId) {
        const section = await this.sectionRepo.findOne({ where: { id: sectionId }, relations: ['lesson'] });
        const videoPercent = section?.viewingWatching || 0;
        const pdf = await this.getSectionPdfPercent(sectionId);
        const pdfPercent = pdf.percent;
        const questions = await this.getSolvedQuestionsPercentBySection(sectionId);
        const questionsPercent = questions.percent;
        const finalPercent = Math.round((videoPercent + pdfPercent + questionsPercent) / 3);
        return {
            sectionId,
            finalPercent,
            videoPercent,
            pdfPercent, section,
            questionsPercent
        };
    }
    async getFullSectionProgres(sectionId) {
        const section = await this.sectionRepo.findOne({ where: { id: sectionId }, relations: ['lesson', 'student'] });
        const videoPercent = section?.viewingWatching || 0;
        const pdf = await this.getSectionPdfPercent(sectionId);
        const pdfPercent = pdf.percent;
        const questions = await this.getSolvedQuestionsPercentBySection(sectionId);
        const questionsPercent = questions.percent;
        const finalPercent = Math.round((videoPercent + pdfPercent + questionsPercent) / 3);
        return {
            sectionId,
            finalPercent,
            videoPercent,
            pdfPercent, section,
            questionsPercent
        };
    }
    async getsection(lessonId) {
        const lesson = await this.lessonRepo.findOne({ where: { id: lessonId } });
        const percentage = lesson.percentage;
        const percentageAnswer = lesson.percentageAnswer;
        const viewPercent = lesson.viewPercent;
        return {
            lessonId,
            viewPercent,
            percentage, percentageAnswer
        };
    }
    async getLessonImage(lessonId, index, res) {
        const lesson = await this.lessonRepo.findOne({ where: { id: lessonId } });
        if (!lesson || !lesson.pdfImages || lesson.pdfImages.length === 0) {
            throw new common_1.NotFoundException('No images found for this lesson');
        }
        if (index < 0 || index >= lesson.pdfImages.length) {
            throw new common_1.NotFoundException('Image index out of range');
        }
        if (!lesson.pdfViews || lesson.pdfViews.length !== lesson.pdfImages.length) {
            lesson.pdfViews = Array(lesson.pdfImages.length).fill(0);
        }
        lesson.pdfViews[index] = 1;
        await this.lessonRepo.save(lesson);
        const imageUrl = path.join(__dirname, '..', '..', 'uploads', 'pdf-images', path.basename(lesson.pdfImages[index]));
        return res.sendFile(imageUrl);
    }
};
exports.PdfController = PdfController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('upload/:lessonId'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/pdfs',
            filename: (req, file, cb) => {
                const fileName = `${Date.now()}${path.extname(file.originalname)}`;
                cb(null, fileName);
            },
        }),
    })),
    __param(0, (0, common_1.Param)('lessonId')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PdfController.prototype, "uploadPdf", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('section/:sectionId/pdf-percent'),
    __param(0, (0, common_1.Param)('sectionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PdfController.prototype, "getSectionPdfPercent", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('section/:sectionId/pdf-percent'),
    __param(0, (0, common_1.Param)('sectionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PdfController.prototype, "getlessonsection", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('lesson/:lessonId/pdf-percent'),
    __param(0, (0, common_1.Param)('lessonId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PdfController.prototype, "getLessonPdfPercent", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('section/:sectionId/full-progress'),
    __param(0, (0, common_1.Param)('sectionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PdfController.prototype, "getFullSectionProgress", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('section/:sectionId/full-progress'),
    __param(0, (0, common_1.Param)('sectionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PdfController.prototype, "getFullSectionProgres", null);
__decorate([
    (0, common_1.Get)('lesson/:lessonId/full'),
    __param(0, (0, common_1.Param)('lessonId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PdfController.prototype, "getsection", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('lesson/:lessonId/image/:index'),
    __param(0, (0, common_1.Param)('lessonId')),
    __param(1, (0, common_1.Param)('index')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], PdfController.prototype, "getLessonImage", null);
exports.PdfController = PdfController = __decorate([
    (0, common_1.Controller)('pdf'),
    __param(1, (0, typeorm_1.InjectRepository)(lesson_entity_1.Lesson)),
    __param(2, (0, typeorm_1.InjectRepository)(section_entity_1.Section)),
    __metadata("design:paramtypes", [pdf_service_1.PdfService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PdfController);
//# sourceMappingURL=pdf.controller.js.map