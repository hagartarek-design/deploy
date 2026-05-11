import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../teacher/users/entities/user.entity';
import { Student } from '../students/entities/student.entity';
import { Role } from './entities/role.entity';

@Module({
  controllers: [RoleController],
  providers: [RoleService],
  imports: [TypeOrmModule.forFeature([
      User,Student ,Role
    ])]
})
export class RoleModule {}
