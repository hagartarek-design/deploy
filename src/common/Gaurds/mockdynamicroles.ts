// import { CanActivate, ExecutionContext } from "@nestjs/common";
// import { Observable } from "rxjs";

// src/auth/jwt-auth.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) return false;

    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      console.log('deco'+request['users']);
      
      request['users'] = decoded; 
      return true;
    } catch {
      return false;
    }
  }
}