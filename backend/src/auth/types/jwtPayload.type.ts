/**
 * Тип данных для представления данных в JSON Web Token (JWT).
 * - name: имя пользователя, для которого был создан токен.
 * - sub: уникальный id пользователя.
 */
export type JwtPayload = {
  name: string;
  sub: string;
};
