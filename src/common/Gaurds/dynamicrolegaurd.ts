// import { CanActivate, ExecutionContext, Injectable, ForbiddenException, ConflictException } from '@nestjs/common';
// import { DataSource, Repository } from 'typeorm';
// import { Reflector } from '@nestjs/core';
// import { Role } from 'src/role/entities/role.entity';
// import { InjectRepository } from '@nestjs/typeorm';

// @Injectable() 
// export class DynamicRoleGuard implements CanActivate {
//   constructor(private readonly dataSource: DataSource, private reflector: Reflector
//  , @InjectRepository(Role) private readonly studentRepository:Repository<Role>

//   ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const user = request['users'];
// console.log(user);

//     const isPublic = this.reflector.getAllAndOverride<boolean>('Public', [
//       context.getHandler(),
//       context.getClass(), 
//     ]);
//     if (isPublic) return true;

//     const method = request.method.toLowerCase();
//     const moduleName = context.getClass().name.replace('Controller', '').toLowerCase();
//   const endpoint = request.route.path.replace(/^\//, '').toLowerCase();
// console.log(method);
// console.log(moduleName);
// console.log(endpoint);

//     const roleRepo = this.dataSource.getRepository(Role);
// console.log(roleRepo);

//     const permission = await this.studentRepository.findOne({
//       where: { module_name: moduleName, endpoint, method },
//     });
// console.log(permission);

//     if (!permission) {
//       throw new ForbiddenException('you have no access to this endpoint');
//     }

//     if (
//       // (student.role === 'teacher' && permission.can_teacher) ||
//         (permission?.name === 'user' && user.roles=='user') ||
//         (permission?.name=== 'student' && user.roles=='student')) {
//       return true;
//     }
//     console.log(user.roles);
//     console.log(permission?.name);
// console.log('you have no access');
// // return new ConflictException()
//     throw new ForbiddenException('you have no access');
//   }
// }
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Role } from 'src/role/entities/role.entity';

@Injectable() 
export class DynamicRoleGuard implements CanActivate {
  constructor(private readonly dataSource: DataSource) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const method = request.method.toLowerCase();

    const rawPath = request.route.path; 
    const endpoint = this.normalizePath(rawPath);

    const requestQueryKeys = Object.keys(request.query || {}).sort();

    const roleRepo = this.dataSource.getRepository(Role);

    const role = await roleRepo.findOne({
      where: { endpoint, method },
    });

    if (!role) {
      throw new ForbiddenException('No role for this endpoint');
    }

    if (role.query) {
      const allowedQueryKeys = role.query.split(',').sort();

      const match =
        allowedQueryKeys.length === requestQueryKeys.length &&
        allowedQueryKeys.every((q, i) => q === requestQueryKeys[i]);

      if (!match) {
        throw new ForbiddenException('Query not allowed for this endpoint');
      }
    }

    return true;
  }

  private normalizePath(path: string): string {
    return path
      .replace(/\/\d+/g, '/:id')                
      .replace(/\/[a-f0-9-]{36}/gi, '/:id')   
      .replace(/^\/+|\/+$/g, '')
      .toLowerCase();
  }
}