export declare class twilioService {
    private client;
    constructor();
    sendsmsotp(phone: string, otp: string): Promise<void>;
}
