// import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
// import { Reflector } from '@nestjs/core'; 
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(private jwtService: JwtService, private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
//     if (isPublic) return true; 

//     const request = context.switchToHttp().getRequest();
//     const authHeader = request.headers.authorization;

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       throw new UnauthorizedException('Missing or invalid token');
//     }

//     const token = authHeader.split(' ')[1];

//     try {
//       const user = this.jwtService.verify(token);
//       request.user = user;
//       return true;
//     } catch (error) {
//       throw new UnauthorizedException('Invalid or expired token');
//     }
//   }
// }

import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ConflictException } from '@nestjs/common';
import { Reflector } from '@nestjs/core'; 
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
   const isPublic = this.reflector.get<boolean>('public', context.getHandler());
    if (isPublic) return true; 

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Missing or invalid token');
      throw new ConflictException('Missing or invalid token')
    }

    const token = authHeader.split(' ')[1];

    try {
      const student = this.jwtService.verify(token); // decoded payload
      request.student = student; // attach as student instead of user
      return true;
    } catch (error) {
      console.log('Invalid or expired token',error);
      
      throw new ConflictException('Invalid or expired token');
    }
  }
}

