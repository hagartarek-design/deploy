import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { GoogleAuthService } from './googleauthservice';
export declare class AuthController {
    private readonly authService;
    private readonly googleAuthService;
    constructor(authService: AuthService, googleAuthService: GoogleAuthService);
    private googleClient;
    private googleClient2;
    googleLogin(idToken: string, roles: any): Promise<{
        success: boolean;
        message: string;
        token: string;
        userId: number;
        refreshtoken: string;
        user: {
            roles: any;
            id: number;
            email: string;
            name: string;
        };
    }>;
    studentGoogleLogin(idToken: string): Promise<any>;
    verifyGoogleToken(idToken: any): Promise<void>;
    login(email: string, password: string): Promise<import("@nestjs/common").UnauthorizedException | import("@nestjs/common").BadRequestException | {
        message: string;
        token: string;
    }>;
    loginstudent(email: string, password: string): Promise<import("@nestjs/common").UnauthorizedException | import("@nestjs/common").BadRequestException | {
        message: string;
        token: string;
        refreshtoken: string;
    }>;
    refresh(body: {
        refreshToken: string;
    }): Promise<import("@nestjs/common").UnauthorizedException | import("@nestjs/common").ConflictException | {
        token: string;
    }>;
    logout(req: any): Promise<{
        message: string;
    }>;
    register(email: string, password: string, phone: string, username: string, fullname: string): Promise<import("../teacher/users/entities/user.entity").User>;
    studentregister(email: string, name: string, password: string, phone: string, fullname: string): Promise<import("../students/entities/student.entity").Student>;
    changePassword(req: any, dto: CreateAuthDto): Promise<{
        message: string;
    }>;
    googleAuth(): Promise<void>;
    googleAuthRedirect(req: any, res: any): any;
}
