import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../../auth/types';

/**
 * Декоратор для получения id текущего пользователя из запроса.
 * @param _ - Неиспользуемый параметр.
 * @param context - Контекст выполнения запроса.
 * @returns id текущего пользователя.
 */
export const GetCurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayload;
    return user.sub;
  },
);
