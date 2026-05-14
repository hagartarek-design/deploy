"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardimgModule = void 0;
const common_1 = require("@nestjs/common");
const cardimg_service_1 = require("./cardimg.service");
const cardimg_controller_1 = require("./cardimg.controller");
const typeorm_1 = require("@nestjs/typeorm");
const cardimg_entity_1 = require("./entities/cardimg.entity");
let CardimgModule = class CardimgModule {
};
exports.CardimgModule = CardimgModule;
exports.CardimgModule = CardimgModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([cardimg_entity_1.Cardimg]),],
        controllers: [cardimg_controller_1.CardimgController],
        providers: [cardimg_service_1.CardimgService],
    })
], CardimgModule);
//# sourceMappingURL=cardimg.module.js.map