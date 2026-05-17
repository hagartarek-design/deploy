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
exports.ExamsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const exam_entity_1 = require("./entities/exam.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
let ExamsService = class ExamsService {
    constructor(userRepository, repository) {
        this.userRepository = userRepository;
        this.repository = repository;
    }
    create(createExamDto) {
        return this.repository.create({});
    }
    async uploadFile(id, file, createExamDto) {
        try {
            if (!file) {
                throw new common_1.BadRequestException('No file uploaded');
            }
            const user = await this.userRepository.findOne({ where: { id: id }, relations: ['exam'] });
            if (!user) {
                throw new common_1.ForbiddenException('User not found');
            }
            user.examcardimg = file.path;
            const newSection = await this.repository.create({
                imgcart: file.path,
                exam_name: createExamDto.exam_name,
                examprice: createExamDto.examprice,
                trials_number: createExamDto.trials_number,
                durationmin: createExamDto.durationmin,
                degree_success: createExamDto.degree_success,
                showdegreeEveryQues: createExamDto.showdegreeEveryQues,
                showDegreeafter: createExamDto.showDegreeafter,
                seedate: createExamDto.seedate,
                startdate: createExamDto.startdate,
                userId: user,
            });
            await this.repository.save(newSection);
            user.exam.push(newSection);
            await this.userRepository.save(user);
            return {
                message: 'File uploaded successfully',
                imagePath: user.cardimg,
                section: newSection,
            };
        }
        catch (e) {
            console.error(e);
            throw new common_1.BadRequestException('Failed to upload file');
        }
    }
    async exam_offline_online(online, page = 1, limit = 9) {
        const skip = (page - 1) * limit;
        const exam = await this.repository.find({ skip,
            take: limit, where: { online }, relations: ['questions'] });
        console.log(Date.now());
        console.log(exam.map((e) => e.startdate));
        const startdate = exam.map((e) => {
            console.log(Date.now(), "  ", new Date(e.startdate).getTime());
            return Date.now() > new Date(e.startdate).getTime();
        });
        console.log(startdate);
        return { message: 'exam online returned successfully', exam, startdate };
    }
    async getpagination(page = 1, limit = 9) {
        const skip = (page - 1) * limit;
        const exam = await this.repository.find({ relations: ['course'], skip,
            take: limit, where: { online: false }
        });
        return exam;
    }
    async getpaginationonline(page = 1, limit = 9) {
        const skip = (page - 1) * limit;
        const exam = await this.repository.find({ relations: ['course'], skip,
            take: limit, where: { online: true }
        });
        return exam;
    }
    async searchExams(search) {
        return this.repository.find({
            where: [
                { exam_name: (0, typeorm_2.Like)(`%${search}%`) },
                { lessons: { name: (0, typeorm_2.Like)(`%${search}%`) } },
            ],
        });
    }
    remove(id) {
        return this.repository.delete(id);
    }
};
exports.ExamsService = ExamsService;
exports.ExamsService = ExamsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(exam_entity_1.Exam)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ExamsService);
//# sourceMappingURL=exams.service.js.map