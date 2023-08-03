import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadWithRt } from '../../auth/types';

/**
 * Декоратор для получения текущего пользователя из запроса.
 * @param data - Имя поля, которое необходимо получить из объекта пользователя.
 * @param context - Контекст выполнения запроса.
 * @returns Значение поля объекта пользователя или весь объект пользователя, если имя поля не указано.
 */
export const GetCurrentUser = createParamDecorator(
  (data: keyof JwtPayloadWithRt | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (!data) return request.user;
    return request.user[data];
  },
);
