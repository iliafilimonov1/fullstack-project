import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// import { CompanySchema, CompanyDocument } from './company.model';
// import { AddressSchema, AddressDocument } from './address.model';
import { UserI } from '../user/types/user.interface';
import { UserDto } from '../user/dto/user.dto';

export type UserDocument = User & Document;

/**
 * Интерфейс для информации о компании пользователя.
 */
// export interface Company {
//   name: string;
//   position: string;
// }

@Schema()
export class User implements UserI {
  /**
   * Идентификатор пользователя.
   * @type {string}
   * @required
   */
  @Prop({ required: false })
  id: string;

  /**
   * Поле для хранения хэша пароля.
   * @type {string}
   * @required
   */
  @Prop({ required: true })
  password: string;

  /**
   * Имя пользователя.
   * @type {string}
   * @required
   */
  @Prop({ required: true })
  username: string;

  /**
   * Токен доступа (access token) пользователя.
   * @type {string}
   */
  @Prop({ required: false })
  access_token: string;

  /**
   * Токен обновления (refresh token) пользователя.
   * @type {string}
   */
  @Prop({ required: false })
  refresh_token: string;

  /**
   * Срок истечения токена доступа пользователя.
   * @type {string}
   */
  @Prop({ required: false })
  accessTokenExpiresAt: Date;

  // /**
  //  * Фамилия пользователя.
  //  * @type {string}
  //  * @required
  //  */
  // @Prop({ required: true })
  // surname: string;

  // /**
  //  * Отчество пользователя.
  //  * @type {string}
  //  * @required
  //  */
  // @Prop({ required: true })
  // patronymic: string;

  // /**
  //  * Дата рождения пользователя.
  //  * @type {Date}
  //  * @required
  //  */
  // @Prop({ required: true })
  // birthDate: Date;

  // /**
  //  * Пол пользователя.
  //  * @type {string}
  //  * @required
  //  */
  // @Prop({ required: true })
  // gender: string;

  // /**
  //  * Страна пользователя.
  //  * @type {string}
  //  * @required
  //  */
  // @Prop({ required: true })
  // country: string;

  // /**
  //  * Город пользователя.
  //  * @type {string}
  //  * @required
  //  */
  // @Prop({ required: true })
  // city: string;

  // /**
  //  * Email пользователя.
  //  * @type {string}
  //  * @required
  //  */
  // @Prop({ required: true })
  // email: string;

  // /**
  //  * Телефон пользователя.
  //  * @type {string}
  //  * @required
  //  */
  // @Prop({ required: true })
  // phone: string;

  // /**
  //  * Адрес пользователя.
  //  * @type {Address}
  //  * @required
  //  */
  // @Prop({ type: AddressSchema, required: true })
  // address: AddressDocument;

  // /**
  //  * Компания пользователя.
  //  * @type {CompanyDocument}
  //  * @optional
  //  */
  // @Prop({ type: CompanySchema, required: false })
  // company: CompanyDocument;

  /**
   * Роль пользователя.
   * @type {string}
   * @required
   * @enum ['admin', 'manager', 'teacher', 'student']
   */
  @Prop({ required: false, enum: ['admin', 'manager', 'teacher', 'student'] })
  role: string;

  // /**
  //  * Является ли пользователь администратором.
  //  * @type {boolean}
  //  * @default false
  //  */
  // @Prop({ default: false })
  // isAdmin: boolean;

  /**
   * Поле для хранения хэша пароля.
   * @type {string}
   * @required
   */
  @Prop({ required: false })
  hash: string;

  /**
   * Поле для хранения хэша обновления токена.
   * @type {string}
   */
  @Prop({ required: false })
  hashedRt?: string;

  /**
   * Конструктор класса User.
   * @param {UserDto} userDto - dto пользователя.
   */
  constructor(userDto: UserDto) {
    this.id = userDto.id;
    this.username = userDto.username;
    this.password = userDto.password;
    // this.surname = userDto.surname;
    // this.patronymic = userDto.patronymic;
    // this.birthDate = userDto.birthDate;
    // this.gender = userDto.gender;
    // this.country = userDto.country;
    // this.city = userDto.city;
    // this.email = userDto.email;
    // this.phone = userDto.phone;
    // this.address = userDto.address as AddressDocument;
    // this.company = userDto.company as CompanyDocument;
    this.role = userDto.role;
    // this.isAdmin = userDto.isAdmin;
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
