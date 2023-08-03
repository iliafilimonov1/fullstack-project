import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

/**
 * Кастомный guard для проверки JWT-токена и контроля доступа к маршрутам.
 * Данный guard расширяет функциональность AuthGuard('jwt') и позволяет обрабатывать маршруты,
 * помеченные декоратором @Public() как публичные (незащищенные).
 * Если маршрут помечен как публичный, то доступ к нему предоставляется без проверки JWT-токена.
 * В противном случае, вызывается стандартный метод canActivate родительского класса AuthGuard('jwt'),
 * который проверяет наличие и валидность JWT-токена для доступа к маршруту.
 */
@Injectable()
export class AtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    return super.canActivate(context);
  }
}
