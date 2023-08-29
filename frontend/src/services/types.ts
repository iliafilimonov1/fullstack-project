/**
 * Интерфейс для токенов доступа и обновления.
 */
export interface Tokens {
  access_token: string;
  refresh_token: string;
  access_token_expires: string;
}

/**
 * Интерфейс для передачи данных аутентификации.
 */
export interface AuthDto {
  username: string;
  password: string;
}
