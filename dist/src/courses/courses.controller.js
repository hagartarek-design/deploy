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
exports.CoursesController = void 0;
const common_1 = require("@nestjs/common");
const courses_service_1 = require("./courses.service");
const create_course_dto_1 = require("./dto/create-course.dto");
const update_course_dto_1 = require("./dto/update-course.dto");
const path = require("path");
const multer_1 = require("multer");
const path_1 = require("path");
const platform_express_1 = require("@nestjs/platform-express");
const public_1 = require("../auth/entities/public");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const lesson_entity_1 = require("../teacher/lesson/entities/lesson.entity");
const fs = require("fs");
const auth_guard_1 = require("../common/Gaurds/auth.guard");
let CoursesController = class CoursesController {
    constructor(coursesService, lesson) {
        this.coursesService = coursesService;
        this.lesson = lesson;
    }
    async getbysectionid(req, section_id) {
        return await this.coursesService.getbysectionid(req['student'].id, section_id);
    }
    async getallCourses(req) {
        return await this.coursesService.getallCourses(req['student'].id);
    }
    async createCard(req) {
        return this.coursesService.generateCard(req['student'].id);
    }
    async getsectionid(req, lesson_id) {
        return await this.coursesService.getsectionid(req['student'].id, lesson_id);
    }
    async uploadPDF(file) {
        return this.coursesService.createPDF(file);
    }
    async getAllPDFs() {
        return this.coursesService.getAllPDFs();
    }
    async getPDF(id) {
        return this.coursesService.getPDF(id);
    }
    async reorderPages(id, body) {
        return this.coursesService.reorderPages(id, body.pageOrder);
    }
    async deletePDF(id) {
        return this.coursesService.deletePDF(id);
    }
    withpaginating(paginationDto) {
        const { page, limit } = paginationDto;
        const offset = (page - 1) * limit;
        return this.coursesService.withpaginating(offset, limit);
    }
    allcourses() {
        return this.coursesService.allcourses();
    }
    findby(name, phoneNum, email, id) {
        return this.coursesService.findby(name, phoneNum, email, id);
    }
    async saveVideoLesson(file) {
        return await this.coursesService.saveVideoLesson(file);
    }
    async uploadVideo(file) {
        return this.coursesService.saveVideo(file);
    }
    async downloadPdf(id, res) {
        const pdf = await this.lesson.findOne({ where: { id, } });
        res.setHeader('content-Type', 'application/pdf');
        res.setHeader('content-Disposition', `attachment; filename=${pdf.name}`);
        res.send(pdf.fileData);
    }
    async payWithCode(req, code, courseId) {
        return await this.coursesService.payWithCode(req['student'].id, code, courseId);
    }
    async generate(body) {
        return await this.coursesService.generatesCode(body.courseId);
    }
    async pdfcreate() { }
    async updatePdf(id, file) {
        return this.coursesService.updatePdf(id, file);
    }
    async streamVideolesson(lesson_id, res) {
        const video = await this.coursesService.findByIdlesson(lesson_id);
        if (!video) {
            return res.status(404).send('Video not found');
        }
        return res.sendFile((0, path_1.join)(process.cwd(), video.path));
    }
    async streamVideo(id, res) {
        const video = await this.coursesService.getVideo(+id);
        if (!video) {
            return res.status(404).send('Video not found');
        }
        return res.sendFile((0, path_1.join)(process.cwd(), video.path));
    }
    courseVideo() { }
    withpagination(paginationDto) {
        const { page, limit } = paginationDto;
        const offset = (page - 1) * limit;
        return this.coursesService.getpagination(offset, limit);
    }
    findOne(name, grade) {
        if (!name || !grade) {
            throw new common_1.BadRequestException('Both name and grade must be provided');
        }
        return this.coursesService.findOne(name, grade);
    }
    findtype(type) {
        const course = this.coursesService.findtype(type);
        return course;
    }
    findmonth_by_year(month_by_year) {
        const course = this.coursesService.findmonth_by_year(month_by_year);
        return course;
    }
    bytypetoday(type) {
        const types = this.coursesService.bytypetoday(type);
        return types;
    }
    async findmany() {
        return await this.coursesService.findmany();
    }
    async getcourseNumStudent(id, page, limit) {
        return await this.coursesService.getcourseNumStudent(id, page, limit);
    }
    async getonecourseStudent(id, page, limit) {
        const courseId = parseInt(id);
        const pageNum = parseInt(page || '1');
        const limitNum = parseInt(limit || '9');
        return await this.coursesService.getonecourseStudent(courseId, pageNum, limitNum);
    }
    async getCourse(id, req, page = 1, limit = 9) {
        const userId = req['user']['id'];
        return await this.coursesService.getCourseWithStudents(id, userId, page, limit);
    }
    async findbyId(id, req, page, limit) {
        return await this.coursesService.findbyId(id, req.user.id, page, limit);
    }
    async findAll(id, page, limit) {
        return await this.coursesService.findAll(id, page, limit);
    }
    byCenterName2(id) {
        return this.coursesService.byCenterName2(id);
    }
    update(id, updateCourseDto) {
        return this.coursesService.update(+id, updateCourseDto);
    }
    remove(id) {
        return this.coursesService.remove(+id);
    }
    async getPdf(id, res) {
        const pdf = await this.coursesService.getPdfById(id);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename="${pdf.originalName}"`);
        const fileBuffer = fs.readFileSync(pdf.filePath);
        res.send(fileBuffer);
    }
    async getAllPdfs() {
        const pdfs = await this.coursesService.getAllPdfs();
        return pdfs.map(pdf => ({
            id: pdf.id,
            originalName: pdf.originalName2,
            totalPages: pdf.totalPages,
            createdAt: pdf.createdAt,
        }));
    }
    async deletePdf(id) {
        await this.coursesService.deletePdf(id);
        return { message: 'Lesson deleted successfully' };
    }
    async recharge(dto, req) {
        const userId = req['student'].id || 1;
        return this.coursesService.useRechargeCard(dto, userId);
    }
    async addToCart(req, id) {
        return await this.coursesService.addToCart(req['student'].id, id);
    }
    async uploadPdf(file) {
        const pdf = await this.coursesService.savePdf(file);
        return {
            message: 'Lesson uploaded successfully',
            pdf: {
                id: pdf.id,
                filename: pdf.filename2,
                originalName: pdf.originalName2,
                totalPages: pdf.totalPages,
                createdAt: pdf.createdAt,
            },
        };
    }
    async serveImage(imagePath, res) {
        const fullPath = path.join('./uploads/images', imagePath);
        if (fs.existsSync(fullPath)) {
            res.sendFile(path.resolve(fullPath));
        }
        else {
            res.status(404).send('Image not found');
        }
    }
};
exports.CoursesController = CoursesController;
__decorate([
    (0, common_1.Get)('sectionbyid'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('section_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "getbysectionid", null);
__decorate([
    (0, common_1.Get)('getallcourses'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "getallCourses", null);
__decorate([
    (0, common_1.Patch)('card'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "createCard", null);
__decorate([
    (0, common_1.Get)('getsectionid'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('lesson_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "getsectionid", null);
__decorate([
    (0, common_1.Post)('upload/pdf'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
                cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "uploadPDF", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "getAllPDFs", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "getPDF", null);
__decorate([
    (0, common_1.Post)(':id/reorder'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "reorderPages", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "deletePDF", null);
__decorate([
    (0, common_1.Get)('/paginationrel'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_course_dto_1.CreateCourseDto]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "withpaginating", null);
__decorate([
    (0, common_1.Get)('/allrel'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "allcourses", null);
__decorate([
    (0, common_1.Get)("bystudent/:id"),
    __param(0, (0, common_1.Query)("name")),
    __param(1, (0, common_1.Query)("phoneNum")),
    __param(2, (0, common_1.Query)("email")),
    __param(3, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Number]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "findby", null);
__decorate([
    (0, public_1.Public)(),
    (0, common_1.Post)('/uploadlessonvideo'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/videos',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, `${uniqueSuffix}${(0, path_1.extname)(file.originalname)}`);
            }
        })
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "saveVideoLesson", null);
__decorate([
    (0, public_1.Public)(),
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/videos',
            filename: (req, file, cb) => {
                const uniqueName = `${Date.now()}-${file.originalname}`;
                cb(null, uniqueName);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "uploadVideo", null);
__decorate([
    (0, public_1.Public)(),
    (0, common_1.Get)(':id/download'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "downloadPdf", null);
__decorate([
    (0, common_1.Patch)('/pay-with-code/charge'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('code')),
    __param(2, (0, common_1.Query)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "payWithCode", null);
__decorate([
    (0, common_1.Patch)('generate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "generate", null);
__decorate([
    (0, common_1.Patch)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "pdfcreate", null);
__decorate([
    (0, public_1.Public)(),
    (0, common_1.Patch)('updatepdf/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                callback(null, uniqueSuffix + (0, path_1.extname)(file.originalname));
            }
        })
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "updatePdf", null);
__decorate([
    (0, public_1.Public)(),
    (0, common_1.Get)('playy/:id'),
    __param(0, (0, common_1.Param)('lesson_id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "streamVideolesson", null);
__decorate([
    (0, public_1.Public)(),
    (0, common_1.Get)('play/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "streamVideo", null);
__decorate([
    (0, common_1.Post)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "courseVideo", null);
__decorate([
    (0, common_1.Get)('/pagination'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_course_dto_1.CreateCourseDto]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "withpagination", null);
__decorate([
    (0, common_1.Get)('/name'),
    __param(0, (0, common_1.Query)('name')),
    __param(1, (0, common_1.Query)('grade')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('/type'),
    __param(0, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "findtype", null);
__decorate([
    (0, common_1.Get)('/month_by_year'),
    __param(0, (0, common_1.Query)('month_by_year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "findmonth_by_year", null);
__decorate([
    (0, common_1.Get)('/bytype'),
    __param(0, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "bytypetoday", null);
__decorate([
    (0, common_1.Get)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "findmany", null);
__decorate([
    (0, common_1.Get)('/coursestudnum'),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "getcourseNumStudent", null);
__decorate([
    (0, common_1.Get)('/onecourse'),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "getonecourseStudent", null);
__decorate([
    (0, common_1.Get)('/course'),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "getCourse", null);
__decorate([
    (0, common_1.Get)('findoneuser'),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Number, Number]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "findbyId", null);
__decorate([
    (0, common_1.Get)('/allbystudents'),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/all/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "byCenterName2", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_course_dto_1.UpdateCourseDto]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "remove", null);
__decorate([
    (0, public_1.Public)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "getPdf", null);
__decorate([
    (0, public_1.Public)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "getAllPdfs", null);
__decorate([
    (0, public_1.Public)(),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "deletePdf", null);
__decorate([
    (0, common_1.Patch)('/update/charge'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_course_dto_1.RechargeDto, Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "recharge", null);
__decorate([
    (0, common_1.Post)('addtocart/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "addToCart", null);
__decorate([
    (0, public_1.Public)(),
    (0, common_1.Post)('upload/pdf'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/pdfs',
            filename: (req, file, cb) => {
                const uniqueName = `${Date.now()}-${file.originalname}`;
                cb(null, uniqueName);
            },
        }),
        fileFilter: (req, file, cb) => {
            if (file.mimetype === 'application/pdf') {
                cb(null, true);
            }
            else {
                cb(new Error('Only Lesson files are allowed'), false);
            }
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "uploadPdf", null);
__decorate([
    (0, public_1.Public)(),
    (0, common_1.Get)('files/images/:path(*)'),
    __param(0, (0, common_1.Param)('path')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "serveImage", null);
exports.CoursesController = CoursesController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('courses'),
    __param(1, (0, typeorm_1.InjectRepository)(lesson_entity_1.Lesson)),
    __metadata("design:paramtypes", [courses_service_1.CoursesService,
        typeorm_2.Repository])
], CoursesController);
//# sourceMappingURL=courses.controller.js.map