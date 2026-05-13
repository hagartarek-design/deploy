"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionstudentsModule = void 0;
const common_1 = require("@nestjs/common");
const questionstudents_service_1 = require("./questionstudents.service");
const questionstudents_controller_1 = require("./questionstudents.controller");
let QuestionstudentsModule = class QuestionstudentsModule {
};
exports.QuestionstudentsModule = QuestionstudentsModule;
exports.QuestionstudentsModule = QuestionstudentsModule = __decorate([
    (0, common_1.Module)({
        controllers: [questionstudents_controller_1.QuestionstudentsController],
        providers: [questionstudents_service_1.QuestionstudentsService],
    })
], QuestionstudentsModule);
//# sourceMappingURL=questionstudents.module.js.map