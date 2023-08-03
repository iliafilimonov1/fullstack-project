import { AuthGuard } from '@nestjs/passport';

/**
 * Кастомный guard для проверки специального JWT-токена, используемого для обновления refresh token'а.
 * Данный guard расширяет функциональность AuthGuard('jwt-refresh') и позволяет контролировать доступ
 * к маршрутам обновления refresh token'а.
 */
export class RtGuard extends AuthGuard('jwt-refresh') {
  constructor() {
    super();
  }
}
