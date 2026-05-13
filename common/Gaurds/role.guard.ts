// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// // import { Observable } from 'rxjs';
// // import { Roles } from '../decorator/role.decorator';

// @Injectable()
// export class RoleGuard implements CanActivate {
//   constructor(private readonly reflector: Reflector) {}
//   canActivate(context: ExecutionContext): boolean {
//     const roles = this.reflector.get('roles', context.getClass());
//    const publicVal=this.reflector.getAllAndMerge('public',[context.getClass(),context.getHandler()])
//   if(publicVal[0]="public")return true 
//     const request = context.switchToHttp().getRequest();
//     if (!roles.includes(request.user.role)) {
//       throw new UnauthorizedException('not allowed for you');
//     }
//     return true;
//   }
// }
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const user = request.user;
console.log('user:'+user);

    if (!roles.includes(user.role)) {
      throw new ForbiddenException(
        'You do not have permission',
      );
    }

    return true;
  }
}