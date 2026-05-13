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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const google_auth_library_1 = require("google-auth-library");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../teacher/users/entities/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const admin = require("firebase-admin");
const jwt_1 = require("@nestjs/jwt");
const student_entity_1 = require("../students/entities/student.entity");
let AuthService = class AuthService {
    constructor(user, students, firebaseAdmin, firebaseteacher, jwtService) {
        this.user = user;
        this.students = students;
        this.firebaseAdmin = firebaseAdmin;
        this.firebaseteacher = firebaseteacher;
        this.jwtService = jwtService;
        this.client = new google_auth_library_1.OAuth2Client;
    }
    async register(email, password, phone, username, fullname) {
        const existingUser = await this.user.findOne({ where: { email } });
        if (existingUser) {
            throw new common_1.HttpException('email already exist', common_1.HttpStatus.BAD_REQUEST);
            ;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.user.create({ email, password: hashedPassword, phone, username, fullname });
        return this.user.save(user);
    }
    async studentregister(email, password, name, phoneNum, fullname) {
        const existingUser = await this.students.findOne({ where: { email, } });
        if (existingUser) {
            throw new common_1.HttpException('email already exist', common_1.HttpStatus.BAD_REQUEST);
            ;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const students = this.students.create({ email, password: hashedPassword, name, phoneNum, fullname, provider: "system" });
        return this.students.save(students);
    }
    async updateRefreshToken(userId, refreshToken) {
        const user = await this.students.findOne({
            where: { id: userId },
        });
        if (!user)
            return null;
        user.refreshToken = refreshToken;
        console.log("refreshhhhh" + user.refreshToken);
        console.log("rrrrre" + refreshToken);
        return this.students.save(user);
    }
    async refreshTokens(refreshToken) {
        try {
            const payload = this.jwtService.verify(refreshToken, { secret: process.env.REFRESH_SECRET });
            const student = await this.students.findOne({ where: { id: payload.id } });
            if (!student || !student.refreshToken)
                return new common_1.UnauthorizedException();
            const isMatch = await bcrypt.compare(refreshToken, student.refreshToken);
            if (!isMatch)
                return new common_1.UnauthorizedException();
            console.log(student.id);
            console.log(student.email);
            console.log(isMatch);
            const token = this.jwtService.sign({ id: student.id, email: student.email }, { secret: process.env.SECRET_KEY, expiresIn: '1m' });
            return { token };
        }
        catch (err) {
            return new common_1.ConflictException('wrong token');
        }
    }
    async loginstudent(email, password) {
        const students = await this.students.findOne({ where: { email } });
        if (!students || !students.isActive == true) {
            return new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, students.password);
        if (!isPasswordValid) {
            return new common_1.BadRequestException();
        }
        const token = this.jwtService.sign({ id: students.id, email: students.email }, { secret: process.env.SECRET_KEY, expiresIn: '1m' });
        const refreshtoken = this.jwtService.sign({ id: students.id, email: students.email }, { secret: process.env.REFRESH_SECRET, expiresIn: '15h' });
        const hashedrefreshtoken = await bcrypt.hash(refreshtoken, 10);
        await this.students.update(students.id, { refreshToken: hashedrefreshtoken });
        console.log();
        if (!students || !(await bcrypt.compare(password, students.password))) {
            return new common_1.UnauthorizedException('Invalid credentials');
        }
        return { message: 'Login successful', token, refreshtoken };
    }
    async login(email, password) {
        const user = await this.user.findOne({ where: { email } });
        if (!user || !user.isActive == true) {
            return new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return new common_1.BadRequestException();
        }
        const token = this.jwtService.sign({ id: user.id, email: user.email }, { expiresIn: '7h' });
        await this.user.update(user.id, { refreshToken: token });
        console.log();
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return new common_1.UnauthorizedException('Invalid credentials');
        }
        return { message: 'Login successful', token };
    }
    async logout(userId) {
        await this.user.update(userId, { refreshToken: null });
        return { message: 'Logout successful' };
    }
    async changePassword(userId, oldPassword, newPassword) {
        const user = await this.user.findOne({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordValid) {
            throw new common_1.BadRequestException('Old password is incorrect');
        }
        user.password = await bcrypt.hash(newPassword, 10);
        await this.user.save(user);
        return { message: 'Password updated successfully' };
    }
    async validateUser(googleId) {
        return this.user.findOne({ where: { googleId } });
    }
    async verifystudentToken(idtoken) {
        try {
            const decoratedToken = await this.firebaseAdmin.auth().verifyIdToken(idtoken);
            return { email: decoratedToken.email,
                name: decoratedToken,
                picture: decoratedToken.picture,
                uid: decoratedToken.uid
            };
        }
        catch (error) {
        }
    }
    async verifyGoogleTokenTeacher(idToken) {
        try {
            const decodedToken = await this.firebaseteacher.auth().verifyIdToken(idToken);
            return {
                email: decodedToken.email,
                name: decodedToken.name,
                picture: decodedToken.picture,
                uid: decodedToken.uid,
            };
        }
        catch (error) {
            console.error('Teacher Google token verification error:', error);
            throw new Error('Invalid Google token');
        }
    }
    async verifyGoogleToken(idToken) {
        try {
            const decodedToken = await this.firebaseAdmin.auth().verifyIdToken(idToken);
            return {
                email: decodedToken.email,
                name: decodedToken.name,
                picture: decodedToken.picture,
                uid: decodedToken.uid,
            };
        }
        catch (error) {
            console.error('Admin Google token verification error:', error);
            throw new Error('Invalid Google token');
        }
    }
    async googleLogin(idToken, roles) {
        const { email, name, picture } = await this.verifyGoogleTokenTeacher(idToken);
        let user = await this.user.findOne({ where: { email } });
        console.log(user);
        if (!user) {
            user = this.user.create({
                name: name, user: { roles: roles },
                email,
                provider: 'google',
                image: picture,
            });
            user.section = { id: user.id };
            await this.user.save(user);
        }
        const token = this.jwtService.sign({ id: user.id, email: user.email, roles: roles }, { expiresIn: '1m' });
        const refreshtoken = this.jwtService.sign({ id: user.id, email: user.email, roles: roles }, { expiresIn: '2m' });
        console.log(token);
        return {
            success: true,
            message: 'Logged in successfully',
            token, userId: user.id,
            refreshtoken, user: {
                roles: roles,
                id: user.id,
                email: user.email,
                name: user.name,
            }
        };
    }
    async studentGoogleLogin(idToken) {
        const { email, name, } = await this.verifyGoogleTokenTeacher(idToken);
        let student = await this.students.findOne({ where: { email } });
        console.log(student);
        if (!student) {
            student = this.students.create({
                name: name,
                email,
                provider: 'google',
            });
            await this.students.save(student);
        }
        const token = this.jwtService.sign({ id: student.id, email: student.email, }, { expiresIn: '1m' });
        const refreshtoken = this.jwtService.sign({ id: student.id, email: student.email, }, { expiresIn: '2m' });
        console.log(token);
        return {
            success: true,
            message: 'Logged in successfully',
            token, studentId: student.id,
            refreshtoken, student: {
                id: student.id,
                email: student.email,
                name: student.name,
            }
        };
    }
    async verifyIdTokenstudent(idToken) {
        const ticket = await this.client.verifyIdToken({
            idToken,
            audience: this.configService.get('60396017051-fmcd4jemom9tckcbfq97b0l1c40ulcfg.apps.googleusercontent.com'),
        });
        const payload = ticket.getPayload();
        if (!payload) {
            throw new Error('Invalid token payload');
        }
        return payload;
    }
    async verifyIdToken(idToken) {
        const ticket = await this.client.verifyIdToken({
            idToken,
            audience: this.configService.get('804258373122-j062cocfrfddq103m6ms16mqtmdp1a62.apps.googleusercontent.com'),
        });
        const payload = ticket.getPayload();
        if (!payload) {
            throw new Error('Invalid token payload');
        }
        return payload;
    }
    async findOrCreateUser(userData) {
        let user = await this.user.findOne({
            where: { googleId: userData.googleId },
        });
        if (!user) {
            user = this.user.create(userData);
            await this.user.save(user);
        }
        return user;
    }
    generateJwt(user) {
        const payload = { sub: user.id, email: user.email };
        return this.jwtService.sign(payload);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(2, (0, common_1.Inject)('FIREBASE_ADMIN')),
    __param(3, (0, common_1.Inject)('FIREBASE_TEACHER')),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository, Object, Object, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map