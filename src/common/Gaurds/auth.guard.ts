// auth.guard.ts

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    // PUBLIC ROUTES
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      'public',
      [context.getHandler(), context.getClass()],
    );

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing token');
    }

    const token = authHeader.split(' ')[1];

    try {
      // VERIFY ACCESS TOKEN
      const decoded = this.jwtService.verify(token, {
        secret: this.configService.get<string>('SECRET_KEY'),
      });

      request.user = decoded;

      console.log(decoded);

      return true;
    } catch (error) {
      console.log(error);

      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}