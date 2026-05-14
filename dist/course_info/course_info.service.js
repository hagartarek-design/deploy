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
exports.CourseInfoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const course_info_entity_1 = require("./entities/course_info.entity");
const course_entity_1 = require("../courses/entities/course.entity");
const typeorm_2 = require("typeorm");
const lesson_entity_1 = require("../teacher/lesson/entities/lesson.entity");
let CourseInfoService = class CourseInfoService {
    constructor(courseinfo, course, lesson) {
        this.courseinfo = courseinfo;
        this.course = course;
        this.lesson = lesson;
    }
    getall() {
        try {
            return this.courseinfo.find({ relations: ['course', 'students'] });
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
    async getpagination(offset, limit) {
        return await this.courseinfo.find({ skip: offset, take: limit, relations: ['course', 'students'] });
    }
    async saveVideoforlesson(file, id) {
        const videoExist = await this.lesson.find({ where: { id } });
        if (!videoExist)
            return new common_1.ConflictException("no id found");
    }
    async saveVideo(file, id) {
        const videoExist = await this.courseinfo.findOne({ where: { id } });
        if (!videoExist)
            return new common_1.ConflictException("no id found");
        const video = await this.courseinfo.update({ id: id }, {
            filename: file.filename,
            originalName: file.originalname,
            mimetype: file.mimetype,
            path: file.path,
        });
        return video;
    }
    async getVideo(id) {
        return this.courseinfo.findOneBy({ id });
    }
    async deletecourse_attend(id) {
        try {
            const user = await this.courseinfo.findOne({ where: { id } });
            return await this.courseinfo.delete(id);
        }
        catch (error) {
            return {
                success: false,
                message: error
            };
        }
    }
    async dropdown(id) {
        try {
            return await this.course.findOne({ where: { id } });
        }
        catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    }
    async findmany() {
        return await this.courseinfo.find();
    }
    courseinfobycourse() {
        this.courseinfo.find({ relations: ['course'] });
    }
};
exports.CourseInfoService = CourseInfoService;
exports.CourseInfoService = CourseInfoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(course_info_entity_1.CourseInfo)),
    __param(1, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __param(2, (0, typeorm_1.InjectRepository)(lesson_entity_1.Lesson)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CourseInfoService);
//# sourceMappingURL=course_info.service.js.map