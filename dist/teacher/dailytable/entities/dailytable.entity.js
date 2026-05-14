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
exports.Dailytable = void 0;
const course_info_entity_1 = require("../../../course_info/entities/course_info.entity");
const typeorm_1 = require("typeorm");
let Dailytable = class Dailytable {
};
exports.Dailytable = Dailytable;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Dailytable.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeorm_1.Timestamp)
], Dailytable.prototype, "created_date", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", typeorm_1.Timestamp)
], Dailytable.prototype, "Updated_date", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => course_info_entity_1.CourseInfo, (courseinfo) => courseinfo.dailytable),
    __metadata("design:type", Array)
], Dailytable.prototype, "course_info", void 0);
exports.Dailytable = Dailytable = __decorate([
    (0, typeorm_1.Entity)()
], Dailytable);
//# sourceMappingURL=dailytable.entity.js.map