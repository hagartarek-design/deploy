import { ConfigService } from '@nestjs/config';
import { TokenPayload } from 'google-auth-library';
export declare class GoogleAuthService {
    private configService;
    private readonly client;
    constructor(configService: ConfigService);
    verifyIdToken(idToken: string): Promise<TokenPayload>;
}
