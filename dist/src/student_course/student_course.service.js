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
exports.StudentCourseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const student_entity_1 = require("../students/entities/student.entity");
const typeorm_2 = require("typeorm");
const course_entity_1 = require("./../courses/entities/course.entity");
const student_course_entity_1 = require("./entities/student_course.entity");
const course_info_entity_1 = require("../course_info/entities/course_info.entity");
let StudentCourseService = class StudentCourseService {
    constructor(Coursesturepo, students, courseInfo, Courses) {
        this.Coursesturepo = Coursesturepo;
        this.students = students;
        this.courseInfo = courseInfo;
        this.Courses = Courses;
    }
    async coursebystudent(id) {
        const course = await this.Courses.find({ where: { student_id: { id } }, relations: ['course_info', 'student_id'] });
        return { course };
    }
    async courseinfo(id, course_id) {
        const course = await this.Courses.find({ where: {
                students: { id }, id: course_id,
            },
            relations: ['course_info', 'section'] });
        return { course };
    }
    async isEnrolled(studentId, courseId) {
        const exists = await this.Coursesturepo.exists({
            where: { student_id: studentId, course_id: courseId, course: { isUsed: false } },
        });
        return exists;
    }
    async courseinfobyid(id, courseId) {
        const course = await this.courseInfo.find({ where: { students: { id }, id: courseId, }, relations: ['section.lesson'] });
        return { course };
    }
    async courseinfobyid2(id, infoid) {
        const courseinfo = await this.courseInfo.find({ where: { students: { id }, id: infoid, }, relations: ['section'] });
        return courseinfo;
    }
    async findbyname(id, course_num) {
        const course_nums = await this.Courses.find({ where: { student: { id }, } });
    }
    async studentcourse(id) {
        const course = await this.students.find({ where: { id: id }, relations: ['student_course.course.course_info',
                'student_course.course.exam', 'student_course.course.section'
            ], select: { student_course: true, }, });
        console.log(course);
        const examlength = course.map((e) => e.student_course.map((e) => e.course.exam)).length;
        const assignmentlength = course.map((e) => e.student_course.map((e) => e.course.exam)).length;
        console.log();
        const sumExamAss = examlength + assignmentlength;
        return { course, sumExamAss };
    }
    async studentcourse2(id, name) {
        const course = await this.Courses.find({ where: { student: { id }, name }, relations: ['course_info',
            ], });
        console.log(course);
        console.log();
        return { course, };
    }
    create(createStudentCourseDto) {
        return 'This action adds a new studentCourse';
    }
    findAll() {
        return `This action returns all studentCourse`;
    }
    findOne(id) {
        return `This action returns a #${id} studentCourse`;
    }
    update(id, updateStudentCourseDto) {
        return `This action updates a #${id} studentCourse`;
    }
    remove(id) {
        return `This action removes a #${id} studentCourse`;
    }
};
exports.StudentCourseService = StudentCourseService;
exports.StudentCourseService = StudentCourseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(student_course_entity_1.StudentCourse)),
    __param(1, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(2, (0, typeorm_1.InjectRepository)(course_info_entity_1.CourseInfo)),
    __param(3, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], StudentCourseService);
//# sourceMappingURL=student_course.service.js.map