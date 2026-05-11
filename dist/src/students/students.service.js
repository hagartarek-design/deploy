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
exports.StudentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const student_entity_1 = require("./entities/student.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../teacher/users/entities/user.entity");
const image_entity_1 = require("../teacher/images/entities/image.entity");
const exam_entity_1 = require("../teacher/exams/entities/exam.entity");
const smsotp_1 = require("../../common/smsotp");
let StudentsService = class StudentsService {
    constructor(imageRepository, user, examrepo, repository, twilioservice) {
        this.imageRepository = imageRepository;
        this.user = user;
        this.examrepo = examrepo;
        this.repository = repository;
        this.twilioservice = twilioservice;
    }
    async sendSmsOtp(sendOtpDTO) {
        const { phoneNum } = sendOtpDTO;
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const createotp = await this.repository.create({ phoneNum, otp, createdAt: new Date() });
        await this.twilioservice.sendsmsotp(phoneNum, otp);
        return createotp;
    }
    async searchStudents(search) {
        return this.repository.find({
            where: [
                { name: (0, typeorm_2.Like)(`%${search}%`) },
                { email: (0, typeorm_2.Like)(`%${search}%`) },
                { phoneNum: (0, typeorm_2.Like)(`%${search}%`) },
            ],
        });
    }
    async searchCourseId(search, id) {
        return await this.repository.find({
            where: [
                { name: (0, typeorm_2.Like)(`%${search}%`), course: { id: id } },
                { email: (0, typeorm_2.Like)(`%${search}%`), course: { id: id } },
                { phoneNum: (0, typeorm_2.Like)(`%${search}%`), course: { id: id } },
            ],
            relations: ['course']
        });
    }
    async mycourses(studentId) {
        const student = await this.repository.findOne({
            where: { id: studentId },
            relations: ['courses', 'courses.users'],
        });
        if (!student) {
            throw new common_1.NotFoundException('student not found');
        }
        if (!student.courses || student.courses.length === 0) {
            throw new common_1.ConflictException('course not found');
        }
        return student;
    }
    async findbyId(id, userId, page = 1, limit = 9, attendence, exam_name) {
        const skip = (page - 1) * limit;
        const student = await this.repository.findOne({
            where: { id: id, sections: { userId: userId, }, exam: { attendence: attendence, exam_name: exam_name } },
            relations: { sections: true, courses: true,
                course: { exam: true }, exam: true }
        });
        const student2 = await this.repository.findOne({
            where: { id: id, sections: { userId: userId, }, exam: { attendence: true, } },
            relations: { sections: true, courses: true,
                course: { exam: true }, exam: true }
        });
        const student3 = await this.repository.findOne({
            where: { id: id, sections: { userId: userId, }, exam: { attendence: false, } },
            relations: { sections: true, courses: true,
                course: { exam: true }, exam: true }
        });
        if (!student)
            return new common_1.ForbiddenException("there is no student");
        if (isNaN(id))
            return new common_1.BadRequestException("nanid");
        if (student) {
            student.exam = student.exam?.slice(skip, skip + limit);
            student2.exam = student2.exam?.slice(skip, skip + limit);
            student3.exam = student3.exam?.slice(skip, skip + limit);
            student.exam.map(exam => exam.attendence == true ? student2 : student3);
            return student;
        }
    }
    async addAnswer(id, addAnswerDto) {
        const students = await this.repository.findOne({ where: { id } });
        if (!students)
            return new common_1.NotFoundException("");
        return await this.repository.update({ id }, { questions: { teacher_answer: addAnswerDto.teacher_answer } });
    }
    async getattendence(attendence, id) {
        const students = await this.repository.findOne({ where: { exam: { attendence: attendence }, id } });
        if (students.attendance == true)
            return await this.repository.findOne({ where: { attendance: true, id, } });
        else
            return await this.repository.findOne({ where: { attendance: false, id }, });
    }
    async getpagination(offset, limit) {
        return await this.repository.find({ skip: offset, take: limit, });
    }
    async getpaginationid(offset, limit, id) {
        return await this.repository.find({ skip: offset, take: limit, where: { course: { id: id } } });
    }
    async handleFileUpload(id, file) {
        try {
            if (!file) {
                return new common_1.BadRequestException('No file uploaded');
            }
            const student = await this.repository.findOne({ where: { id, }, relations: ['images'] });
            if (!student) {
                return new common_1.ForbiddenException('student not found');
            }
            student.img = `/uploads/${file.filename}`;
            await this.repository.save(student);
            return { message: 'File uploaded successfully', imagePath: student.img, };
        }
        catch (e) {
            console.log(e);
            return e;
        }
    }
    async typeonline(coursetype) {
        if (coursetype == 'all')
            return await this.repository.find();
        return await this.repository.find({ where: { coursetype: coursetype } });
    }
    async findAll() {
        return await this.repository.find();
    }
    async getLastImage(students) {
        return await this.imageRepository.find({
            where: { user: { id: students } },
            order: { id: 'DESC' },
            relations: ['students'],
        });
    }
    async search(search) {
        return this.examrepo.find({
            where: [
                { exam_name: (0, typeorm_2.Like)(`%${search}%`) },
                { lessons: { name: (0, typeorm_2.Like)(`%${search}%`) } },
            ],
        });
    }
    async saveinfo(createstudDto) {
        const { fullname, name, email, stud_school, grade, branch, mother_phone_num, father_phone_num, city, cityPlace, Location, buildingNum, homeNum, uniqueDescription } = createstudDto;
        const stu = {
            fullname, name, email, stud_school, grade, branch, mother_phone_num, father_phone_num, city, cityPlace, Location, buildingNum, homeNum, uniqueDescription
        };
        return this.repository.create(stu);
    }
    async update(UpdateStudentDto, id) {
        const findbyid = await this.repository.findOne({ where: { id } });
        if (findbyid.id != id)
            return new common_1.ConflictException('not found student');
        const student = {
            ...UpdateStudentDto,
        };
        return this.repository.update({ id }, student);
    }
    async profile(id) {
        return await this.repository.findOne({ where: { id }, relations: ['courses'] });
    }
};
exports.StudentsService = StudentsService;
exports.StudentsService = StudentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(image_entity_1.Image)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(exam_entity_1.Exam)),
    __param(3, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        smsotp_1.twilioService])
], StudentsService);
//# sourceMappingURL=students.service.js.map