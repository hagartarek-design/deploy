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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const course_info_entity_1 = require("../../course_info/entities/course_info.entity");
const course_reservation_entity_1 = require("../../course_reservation/entities/course_reservation.entity");
const course_entity_1 = require("../../courses/entities/course.entity");
const exam_entity_1 = require("../../teacher/exams/entities/exam.entity");
const image_entity_1 = require("../../teacher/images/entities/image.entity");
const section_entity_1 = require("../../sections/entities/section.entity");
const userquestion_entity_1 = require("../../teacher/userquestion/entities/userquestion.entity");
const typeorm_1 = require("typeorm");
const student_course_entity_1 = require("../../student_course/entities/student_course.entity");
const lesson_entity_1 = require("../../teacher/lesson/entities/lesson.entity");
const code_entity_1 = require("../../code/entities/code.entity");
const attachment_entity_1 = require("../../attachments/entities/attachment.entity");
const studentquestion_entity_1 = require("../../studentquestions/entities/studentquestion.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let Student = class Student {
};
exports.Student = Student;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Student.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.Users, users => users.student),
    __metadata("design:type", user_entity_1.Users)
], Student.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], Student.prototype, "usedCards", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Student.prototype, "isUsed", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => code_entity_1.Code, (card) => card.students, { cascade: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Student.prototype, "rechargeCards", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "refreshToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "stud_school", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Student.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true, nullable: true }),
    __metadata("design:type", Boolean)
], Student.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "cityPlace", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Student.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "Location", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Student.prototype, "buildingNum", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Student.prototype, "homeNum", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "uniqueDescription", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "fullname", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Student.prototype, "number", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], Student.prototype, "attendance", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "grade", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "provider", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], Student.prototype, "sheets_paym", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => student_course_entity_1.StudentCourse, (student_course) => student_course.student),
    __metadata("design:type", Array)
], Student.prototype, "student_course", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => lesson_entity_1.Lesson, (lesson) => lesson.student),
    __metadata("design:type", Array)
], Student.prototype, "lesson", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "facebookLink", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => course_entity_1.Course, course => course.students, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }),
    (0, typeorm_1.JoinTable)({
        name: 'student_course',
        joinColumn: {
            name: 'student_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'course_id',
            referencedColumnName: 'id',
        },
    }),
    __metadata("design:type", Array)
], Student.prototype, "courses", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "Guardian_num", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "parent_num", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Student.prototype, "percentage", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Student.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => course_info_entity_1.CourseInfo, (course) => course.students),
    __metadata("design:type", course_info_entity_1.CourseInfo)
], Student.prototype, "course_info", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => section_entity_1.Section, (section) => section.student),
    __metadata("design:type", Array)
], Student.prototype, "sections", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => attachment_entity_1.Attachment, (attachment) => attachment.student),
    __metadata("design:type", Array)
], Student.prototype, "attachments", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_reservation_entity_1.CourseReservation, (courses) => courses.students, {}),
    __metadata("design:type", Array)
], Student.prototype, "coursereserve", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_entity_1.Course, (course) => course.student, {}),
    __metadata("design:type", Array)
], Student.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => exam_entity_1.Exam, (exam) => exam.student, {}),
    __metadata("design:type", Array)
], Student.prototype, "exam", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => userquestion_entity_1.Userquestion, (userquestion) => userquestion.students, {}),
    __metadata("design:type", userquestion_entity_1.Userquestion)
], Student.prototype, "questions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => course_entity_1.Course, (courses_id) => courses_id.student_id, {}),
    __metadata("design:type", Array)
], Student.prototype, "courses_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "phoneNum", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "otp", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "customernum", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "img", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "branch", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "father_phone_num", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "mother_phone_num", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "parent1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "parent2", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "coursetype", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => image_entity_1.Image, (image) => image.student, { cascade: true }),
    __metadata("design:type", Array)
], Student.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => studentquestion_entity_1.Studentquestion, (studentques) => studentques.student, { cascade: true }),
    __metadata("design:type", Array)
], Student.prototype, "student_question", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "semester", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "center", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "picture", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Student.prototype, "walletBalance", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Student.prototype, "balance", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => course_entity_1.Course, (tx) => tx.student_id),
    __metadata("design:type", Array)
], Student.prototype, "student_id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.Users, user => user.student, { onDelete: "CASCADE" }),
    __metadata("design:type", user_entity_1.Users)
], Student.prototype, "user", void 0);
exports.Student = Student = __decorate([
    (0, typeorm_1.Entity)('student')
], Student);
//# sourceMappingURL=student.entity.js.map