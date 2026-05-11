import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../teacher/users/entities/user.entity';
import { Users } from './entities/user.entity';
import {Student} from '../students/entities/student.entity';
import { JwtModule, } from '@nestjs/jwt';
import { GoogleAuthService } from '../auth/googleauthservice';
import { Role } from '../role/entities/role.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  exports:[JwtModule],
  imports:[
      
      ConfigModule.forRoot({isGlobal: true,}),
      JwtModule.register({
    secret: process.env.SECRET_KEY || 'your_secret_key',
    signOptions: { expiresIn: '1h' },
  }),
    TypeOrmModule.forFeature([User,Users,Student,Role])],
  controllers: [UsersController],
  providers: [UsersService,GoogleAuthService],
})
export class UsersModules {}
