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
exports.StudentquestionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const studentquestion_entity_1 = require("./entities/studentquestion.entity");
const course_entity_1 = require("../courses/entities/course.entity");
let StudentquestionsService = class StudentquestionsService {
    constructor(repository, courseRepo) {
        this.repository = repository;
        this.courseRepo = courseRepo;
    }
    async create(createStudentquestionDto, id, name) {
        const students = await this.repository.findOne({
            relations: ['course'],
            where: { course: { name: name, student_id: { id } } }
        });
        const course = await this.courseRepo.findOne({ where: { name, student_id: { id } } });
        if (!course)
            return new common_1.NotFoundException("student not found");
        console.log(students.course.id);
        const quesAnswer = await this.repository.create({
            ...createStudentquestionDto, course: { id: course.id }, student: { id: students.id }
        });
        return await this.repository.save(quesAnswer);
    }
    findAll() {
        return `This action returns all studentquestions`;
    }
    findOne(id) {
        return `This action returns a #${id} studentquestion`;
    }
    update(id, updateStudentquestionDto) {
        return `This action updates a #${id} studentquestion`;
    }
    remove(id) {
        return `This action removes a #${id} studentquestion`;
    }
};
exports.StudentquestionsService = StudentquestionsService;
exports.StudentquestionsService = StudentquestionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(studentquestion_entity_1.Studentquestion)),
    __param(1, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], StudentquestionsService);
//# sourceMappingURL=studentquestions.service.js.map