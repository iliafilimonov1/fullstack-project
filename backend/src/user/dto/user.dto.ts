// import { Company } from './../schemas/user.model';
// import { IAddress } from '../schemas/address.model';

/**
 * DTO (Data Transfer Object) для пользователя.
 */
export class UserDto {
  /**
   * Идентификатор пользователя.
   * @type {string}
   */
  id: string;

  /**
   * Пароль пользователя.
   * @type {string}
   */
  password: string;

  /**
   * Имя пользователя.
   * @type {string}
   */
  username: string;

  /**
   * Роль пользователя.
   * Допустимые значения: 'admin', 'manager', 'teacher', 'student'.
   * @type {string}
   */
  role: string;
}
