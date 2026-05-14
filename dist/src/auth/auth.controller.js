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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const google_auth_library_1 = require("google-auth-library");
const public_1 = require("./entities/public");
const create_auth_dto_1 = require("./dto/create-auth.dto");
const googleauthservice_1 = require("./googleauthservice");
const auth_guard_1 = require("@nestjs/passport/dist/auth.guard");
let AuthController = class AuthController {
    constructor(authService, googleAuthService) {
        this.authService = authService;
        this.googleAuthService = googleAuthService;
        this.googleClient = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);
        this.googleClient2 = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID2, process.env.GOOGLE_CLIENT_SECRET2);
    }
    async googleLogin(idToken, roles) {
        return await this.authService.googleLogin(idToken, roles);
    }
    async studentGoogleLogin(idToken) {
        return await this.authService.studentGoogleLogin(idToken);
    }
    async verifyGoogleToken(idToken) {
        const client = new google_auth_library_1.OAuth2Client();
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.CLIENT_ID
        });
        const payload = ticket.getPayload();
    }
    async login(email, password) {
        return await this.authService.login(email, password);
    }
    async loginstudent(email, password) {
        return await this.authService.loginstudent(email, password);
    }
    refresh(body) {
        return this.authService.refreshTokens(body.refreshToken);
    }
    async logout(req) {
        return this.authService.logout(req.user.id);
    }
    register(email, password, phone, username, fullname) {
        const data = this.authService.register(email, password, phone, username, fullname);
        return data;
    }
    studentregister(email, name, password, phone, fullname) {
        const data = this.authService.studentregister(email, password, name, phone, fullname);
        return data;
    }
    async changePassword(req, dto) {
        return this.authService.changePassword(req.user.id, dto.oldPassword, dto.newPassword);
    }
    async googleAuth() {
    }
    googleAuthRedirect(req, res) {
        const user = req.user;
        return res.redirect(`flutterapp://login?token=${user.accessToken}`);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, public_1.Public)(),
    (0, common_1.Post)('google-login'),
    __param(0, (0, common_1.Body)('idToken')),
    __param(1, (0, common_1.Body)('roles')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleLogin", null);
__decorate([
    (0, public_1.Public)(),
    (0, common_1.Post)('google-login/students'),
    __param(0, (0, common_1.Body)('idToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "studentGoogleLogin", null);
__decorate([
    (0, public_1.Public)(),
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)('email')),
    __param(1, (0, common_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, public_1.Public)(),
    (0, common_1.Post)('login/student'),
    __param(0, (0, common_1.Body)('email')),
    __param(1, (0, common_1.Body)("password")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginstudent", null);
__decorate([
    (0, public_1.Public)(),
    (0, common_1.Post)('refresh'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.Post)('/logout'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, public_1.Public)(),
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)('email')),
    __param(1, (0, common_1.Body)('password')),
    __param(2, (0, common_1.Body)('phone')),
    __param(3, (0, common_1.Body)('username')),
    __param(4, (0, common_1.Body)('fullname')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "register", null);
__decorate([
    (0, public_1.Public)(),
    (0, common_1.Post)('/register/students'),
    __param(0, (0, common_1.Body)('email')),
    __param(1, (0, common_1.Body)('name')),
    __param(2, (0, common_1.Body)('password')),
    __param(3, (0, common_1.Body)('phone')),
    __param(4, (0, common_1.Body)('fullname')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "studentregister", null);
__decorate([
    (0, common_1.Put)('change-password'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_auth_dto_1.CreateAuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Get)('google'),
    (0, common_1.UseGuards)((0, auth_guard_1.AuthGuard)('google')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuth", null);
__decorate([
    (0, common_1.Get)('google/callback'),
    (0, common_1.UseGuards)((0, auth_guard_1.AuthGuard)('google')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "googleAuthRedirect", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        googleauthservice_1.GoogleAuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map