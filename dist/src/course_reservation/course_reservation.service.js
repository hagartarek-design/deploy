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
exports.CourseReservationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const course_reservation_entity_1 = require("./entities/course_reservation.entity");
const typeorm_2 = require("typeorm");
let CourseReservationService = class CourseReservationService {
    constructor(coursereservation) {
        this.coursereservation = coursereservation;
    }
    create(createCourseReservationDto) {
        return 'This action adds a new courseReservation';
    }
    async getcoursereservation() {
        return await this.coursereservation.find({ relations: ['students', 'course'] });
    }
    findAll() {
        return `This action returns all courseReservation`;
    }
    findOne(id) {
        return `This action returns a #${id} courseReservation`;
    }
    update(id, updateCourseReservationDto) {
        return `This action updates a #${id} courseReservation`;
    }
    remove(id) {
        return `This action removes a #${id} courseReservation`;
    }
};
exports.CourseReservationService = CourseReservationService;
exports.CourseReservationService = CourseReservationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(course_reservation_entity_1.CourseReservation)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CourseReservationService);
//# sourceMappingURL=course_reservation.service.js.map