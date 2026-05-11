import { Injectable } from "@nestjs/common";
import * as Twilio from 'twilio';
@Injectable()
export class  twilioService{
    private client:Twilio.Twilio;
    constructor(){
        this.client=Twilio(process.env.SID_SMS,process.env.TOKEN_SMS)
    }
    async sendsmsotp( phone:string,otp:string){
await this.client.messages.create({
    body:`your otp is ${otp}`,from:process.env.PHONE_NUM,to:phone
})


    }
}