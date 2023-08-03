import { IsNotEmpty, IsString } from 'class-validator';

/**
 * Класс AuthDto используется для передачи данных аутентификации и обновления токенов.
 */
export class AuthDto {
  /**
   * Имя пользователя.
   * @type {string}
   */
  @IsNotEmpty()
  @IsString()
  username: string;

  /**
   * Пароль пользователя.
   * @type {string}
   */
  @IsNotEmpty()
  @IsString()
  password: string;

  /**
   * Refresh токен для обновления access токена.
   * @type {string}
   */
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
