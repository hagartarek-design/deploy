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
exports.Course = void 0;
const student_entity_1 = require("../../students/entities/student.entity");
const event_entity_1 = require("../../teacher/events/entities/event.entity");
const typeorm_1 = require("typeorm");
const course_attend_entity_1 = require("../../course_attend/entities/course_attend.entity");
const exam_entity_1 = require("../../teacher/exams/entities/exam.entity");
const course_info_entity_1 = require("../../course_info/entities/course_info.entity");
const course_reservation_entity_1 = require("../../course_reservation/entities/course_reservation.entity");
const section_entity_1 = require("../../sections/entities/section.entity");
const common_1 = require("@nestjs/common");
const assignment_entity_1 = require("../../assignments/entities/assignment.entity");
const student_course_entity_1 = require("../../student_course/entities/student_course.entity");
const user_entity_1 = require("../../teacher/users/entities/user.entity");
const studentquestion_entity_1 = require("../../studentquestions/entities/studentquestion.entity");
const cart_entity_1 = require("../../cart/entities/cart.entity");
let Course = class Course {
};
exports.Course = Course;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Course.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 10 }),
    __metadata("design:type", Number)
], Course.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "merchantRef", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Course.prototype, "isUsed", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "Video", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => student_course_entity_1.StudentCourse, (studentCourse) => studentCourse.student),
    __metadata("design:type", Array)
], Course.prototype, "studentCourses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => studentquestion_entity_1.Studentquestion, (studentquestions) => studentquestions.course),
    __metadata("design:type", Array)
], Course.prototype, "studentquestions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cart_entity_1.Cart, (cart) => cart.course),
    __metadata("design:type", Array)
], Course.prototype, "cart", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, common_1.Optional)(),
    __metadata("design:type", String)
], Course.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], Course.prototype, "attendance", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "grade", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], Course.prototype, "sheets_paym", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ nullable: true }),
    __metadata("design:type", typeorm_1.Timestamp)
], Course.prototype, "created_date", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ nullable: true }),
    __metadata("design:type", typeorm_1.Timestamp)
], Course.prototype, "Updated_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "month_by_year", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => event_entity_1.Event, (productCharacteristic) => productCharacteristic.course),
    __metadata("design:type", Array)
], Course.prototype, "event", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => course_reservation_entity_1.CourseReservation, (productCharacteristic) => productCharacteristic.course),
    __metadata("design:type", Array)
], Course.prototype, "coursereservation", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => exam_entity_1.Exam, (productCharacteristic) => productCharacteristic.course),
    __metadata("design:type", Array)
], Course.prototype, "exam", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => assignment_entity_1.Assignment, (assignment) => assignment.course),
    __metadata("design:type", Array)
], Course.prototype, "assignment", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => course_attend_entity_1.CourseAttend, (courseattend) => courseattend.course),
    __metadata("design:type", Array)
], Course.prototype, "course_attend", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => student_entity_1.Student, student => student.course),
    __metadata("design:type", Array)
], Course.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => student_entity_1.Student, student => student.courses, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION', }),
    __metadata("design:type", Array)
], Course.prototype, "students", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User, user => user.courses, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION', }),
    __metadata("design:type", Array)
], Course.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => course_info_entity_1.CourseInfo, (course_info) => course_info.course),
    __metadata("design:type", Array)
], Course.prototype, "course_info", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => section_entity_1.Section, (section) => section.course),
    __metadata("design:type", Array)
], Course.prototype, "section", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Course.prototype, "availableStudents", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "placecountry", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "originalName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "filename", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "filename2", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "originalName2", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "mimetype", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => student_entity_1.Student, (student) => student.courses_id, {}),
    __metadata("design:type", student_entity_1.Student)
], Course.prototype, "student_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Course.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "fawryRefNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Course.prototype, "viewedCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Course.prototype, "percentage", void 0);
exports.Course = Course = __decorate([
    (0, typeorm_1.Entity)()
], Course);
//# sourceMappingURL=course.entity.js.map