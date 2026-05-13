import {  Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/teacher/users/entities/user.entity';
import { JwtModule, JwtService, } from '@nestjs/jwt';
import { Student } from 'src/students/entities/student.entity';
import { ConfigModule,  } from '@nestjs/config';
import { GoogleAuthService } from './googleauthservice';

@Module({
  imports:[
    ConfigModule.forRoot({isGlobal: true,}),
    TypeOrmModule.forFeature([User,Student]), 
   
    
    
    // JwtModule.register({
    //   secret:process.env.SECRET_Key||"", 
    //   signOptions: { expiresIn: '1h' },
    // }),
    // ConfigService,
    
    JwtModule.register({
    secret: process.env.SECRET_KEY || 'your_secret_key',
    signOptions: { expiresIn: '1m' },
  }),
], 
  controllers: [AuthController,],
  providers: [AuthService,AuthService,
    GoogleAuthService,//JwtService

  // {
  //   provide: APP_GUARD,
  //   useClass: AuthGuard,
  // },
  ],
  exports:[JwtModule,AuthService]
})
export class AuthModule {}
