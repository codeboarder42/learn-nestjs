import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Permissions } from './roles';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride(Permissions, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredPermissions) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return requiredPermissions.some((permission) =>
      user.permissions?.includes(permission),
    );
  }
}
