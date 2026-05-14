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
exports.PdfService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const child_process_1 = require("child_process");
const util_1 = require("util");
const path = require("path");
const fs = require("fs");
const execPromise = (0, util_1.promisify)(child_process_1.exec);
const lesson_entity_1 = require("../teacher/lesson/entities/lesson.entity");
let PdfService = class PdfService {
    constructor(lessonRepo) {
        this.lessonRepo = lessonRepo;
    }
    async convertPdfToImages(pdfPath, outputDir) {
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        const fileName = path.basename(pdfPath, path.extname(pdfPath));
        const command = `pdftoppm -png "${pdfPath}" "${path.join(outputDir, fileName)}"`;
        try {
            await execPromise(command);
            const files = fs
                .readdirSync(outputDir)
                .filter(f => f.startsWith(fileName) && f.endsWith('.png'))
                .map(f => path.join(outputDir, f));
            return files;
        }
        catch (error) {
            console.error('Poppler error:', error);
            throw new Error('Failed to convert PDF to images');
        }
    }
    async updatePdf(id, pdfPath) {
        const lesson = await this.lessonRepo.findOne({ where: { id } });
        if (!lesson)
            throw new common_1.NotFoundException('Lesson not found');
        lesson.pdfPath = pdfPath;
        return this.lessonRepo.save(lesson);
    }
    async getPdfPath(id) {
        const lesson = await this.lessonRepo.findOne({ where: { id } });
        if (!lesson || !lesson.pdfPath)
            throw new common_1.NotFoundException('PDF not found');
        if (!fs.existsSync(lesson.pdfPath)) {
            throw new common_1.NotFoundException('PDF file missing on disk');
        }
        return { pdfPath: lesson.pdfPath };
    }
    async savePdfImages(lessonId, pdfPath, images) {
        const lesson = await this.lessonRepo.findOne({ where: { id: lessonId, content: {} } });
        if (!lesson)
            throw new common_1.NotFoundException('Lesson not found');
        lesson.pdfPath = pdfPath;
        lesson.pdfImages = images;
        return this.lessonRepo.save(lesson);
    }
};
exports.PdfService = PdfService;
exports.PdfService = PdfService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(lesson_entity_1.Lesson)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PdfService);
//# sourceMappingURL=pdf.service.js.map