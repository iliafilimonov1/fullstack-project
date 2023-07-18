import { Address, Company } from './../schemas/user.model';

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
   * Имя пользователя.
   * @type {string}
   */
  name: string;

  /**
   * Фамилия пользователя.
   * @type {string}
   */
  surname: string;

  /**
   * Отчество пользователя.
   * @type {string}
   */
  patronymic: string;

  /**
   * Дата рождения пользователя.
   * @type {Date}
   */
  birthDate: Date;

  /**
   * Пол пользователя.
   * @type {string}
   */
  gender: string;

  /**
   * Страна пользователя.
   * @type {string}
   */
  country: string;

  /**
   * Город пользователя.
   * @type {string}
   */
  city: string;

  /**
   * Email пользователя.
   * @type {string}
   */
  email: string;

  /**
   * Телефон пользователя.
   * @type {string}
   */
  phone: string;

  /**
   * Адрес пользователя.
   * @type {Address}
   */
  address: Address;

  /**
   * Компания пользователя.
   * @type {Company}
   */
  company: Company;

  /**
   * Роль пользователя.
   * Допустимые значения: 'admin', 'manager', 'teacher', 'student'.
   * @type {string}
   */
  role: string;

  /**
   * Является ли пользователь администратором.
   * @type {boolean}
   */
  isAdmin: boolean;
}
