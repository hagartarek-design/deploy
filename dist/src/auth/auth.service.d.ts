import { BadRequestException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { TokenPayload } from 'google-auth-library';
import { User } from 'src/teacher/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as admin from 'firebase-admin';
import { JwtService } from '@nestjs/jwt';
import { Student } from 'src/students/entities/student.entity';
export declare class AuthService {
    private user;
    private readonly students;
    private readonly firebaseAdmin;
    private jwtService;
    private client;
    private readonly configService;
    constructor(user: Repository<User>, students: Repository<Student>, firebaseAdmin: typeof admin, jwtService: JwtService);
    register(email: string, password: string, phone: string, username: string, fullname: string): Promise<User>;
    studentregister(email: string, password: string, name: string, phoneNum: string, fullname: string): Promise<Student>;
    updateRefreshToken(userId: number, refreshToken: string | null): Promise<Student>;
    refreshTokens(refreshToken: string): Promise<ConflictException | UnauthorizedException | {
        token: string;
    }>;
    loginstudent(email: string, password: string): Promise<UnauthorizedException | BadRequestException | {
        message: string;
        token: string;
        refreshtoken: string;
    }>;
    login(email: string, password: string): Promise<UnauthorizedException | BadRequestException | {
        message: string;
        token: string;
    }>;
    logout(userId: number): Promise<{
        message: string;
    }>;
    changePassword(userId: number, oldPassword: string, newPassword: string): Promise<{
        message: string;
    }>;
    validateUser(googleId: string): Promise<User | null>;
    verifystudentToken(idtoken: string): Promise<{
        email: string;
        name: import("firebase-admin/lib/auth/token-verifier").DecodedIdToken;
        picture: string;
        uid: string;
    }>;
    verifyGoogleToken(idToken: string): Promise<{
        email: string;
        name: any;
        picture: string;
        uid: string;
    }>;
    studentGoogleLogin(idToken: string): Promise<any>;
    googleLogin(idToken: string): Promise<{
        success: boolean;
        message: string;
        token: string;
        refreshtoken: string;
    }>;
    verifyIdTokenstudent(idToken: string): Promise<TokenPayload>;
    verifyIdToken(idToken: string): Promise<TokenPayload>;
    findOrCreateUser(userData: {
        googleId: string;
        email: string;
        name: string;
        picture?: string;
    }): Promise<User>;
    generateJwt(user: User): string;
}
