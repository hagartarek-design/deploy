import { Module } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { AssignmentsController } from './assignments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { Userquestion } from 'src/teacher/userquestion/entities/userquestion.entity';
import { User } from 'src/teacher/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'common/Gaurds/auth.guard';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from 'src/teacher/users/uploads/fileupload';
import { Attachment } from 'src/attachments/entities/attachment.entity';

@Module({imports:[
   MulterModule .register(multerConfig),
      // JwtModule.register({
      //         secret: process.env.SECRET_KEY || 'your_secret_key',
      //         signOptions: { expiresIn: '1h' },
      //       }),
  TypeOrmModule.forFeature([Assignment,Userquestion,User,Attachment])
],
  controllers: [AssignmentsController],
  providers: [AssignmentsService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ]
    ,
})
export class AssignmentsModule {}
