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
exports.CourseReservation = void 0;
const typeorm_1 = require("typeorm");
const course_entity_1 = require("../../courses/entities/course.entity");
const student_entity_1 = require("../../students/entities/student.entity");
let CourseReservation = class CourseReservation {
};
exports.CourseReservation = CourseReservation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CourseReservation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CourseReservation.prototype, "place", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], CourseReservation.prototype, "start_date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CourseReservation.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_entity_1.Course, (courses) => courses.coursereservation, {}),
    __metadata("design:type", course_entity_1.Course)
], CourseReservation.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => student_entity_1.Student, (productCharacteristic) => productCharacteristic.coursereserve),
    __metadata("design:type", student_entity_1.Student)
], CourseReservation.prototype, "students", void 0);
exports.CourseReservation = CourseReservation = __decorate([
    (0, typeorm_1.Entity)()
], CourseReservation);
//# sourceMappingURL=course_reservation.entity.js.map