import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../Gaurds/auth.guard';
import { RolesGuard } from '../Gaurds/role.guard';
import { Roles } from './role.decorator';

export function Auth(...roles: string[]) {
  return applyDecorators(Roles(...roles), UseGuards(AuthGuard, RolesGuard));
}

