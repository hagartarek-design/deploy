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
exports.twilioService = void 0;
const common_1 = require("@nestjs/common");
const Twilio = require("twilio");
let twilioService = class twilioService {
    constructor() {
        this.client = Twilio(process.env.SID_SMS, process.env.TOKEN_SMS);
    }
    async sendsmsotp(phone, otp) {
        await this.client.messages.create({
            body: `your otp is ${otp}`, from: process.env.PHONE_NUM, to: phone
        });
    }
};
exports.twilioService = twilioService;
exports.twilioService = twilioService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], twilioService);
//# sourceMappingURL=smsotp.js.map