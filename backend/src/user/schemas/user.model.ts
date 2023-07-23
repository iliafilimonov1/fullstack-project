import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// import { CompanySchema, CompanyDocument } from './company.model';
// import { AddressSchema, AddressDocument } from './address.model';
import { UserI } from '../types/user.interface';
import { UserDto } from '../dto/user.dto';

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
   * Пароль пользователя.
   * @type {string}
   * @required
   */
  @Prop({ required: true })
  password: string;

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
   * Имя пользователя.
   * @type {string}
   * @required
   */
  @Prop({ required: true })
  username: string;

  /**
   * Роль пользователя.
   * @type {string}
   * @required
   * @enum ['admin', 'manager', 'teacher', 'student']
   */
  @Prop({ required: false, enum: ['admin', 'manager', 'teacher', 'student'] })
  role: string;

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
