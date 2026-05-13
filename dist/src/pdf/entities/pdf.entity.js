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
exports.Pdf = void 0;
const typeorm_1 = require("typeorm");
let Pdf = class Pdf {
};
exports.Pdf = Pdf;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Pdf.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true
    }),
    __metadata("design:type", String)
], Pdf.prototype, "filename", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true
    }),
    __metadata("design:type", String)
], Pdf.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Pdf.prototype, "originalName", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], Pdf.prototype, "pdfViews", void 0);
exports.Pdf = Pdf = __decorate([
    (0, typeorm_1.Entity)()
], Pdf);
//# sourceMappingURL=pdf.entity.js.map