import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserI } from '../items/interfaces/user.interface';
import { UserDto } from 'src/dtos/user.dto';

export type UserDocument = User & Document;

/**
 * Интерфейс для адреса пользователя.
 */
export interface Address {
  street: string;
  suite: string;
  city: string;
}

/**
 * Интерфейс для информации о компании пользователя.
 */
export interface Company {
  name: string;
  position: string;
}

@Schema()
export class User implements UserI {
  /**
   * Идентификатор пользователя.
   * @type {string}
   * @required
   */
  @Prop({ required: true })
  id: string;

  /**
   * Имя пользователя.
   * @type {string}
   * @required
   */
  @Prop({ required: true })
  name: string;

  /**
   * Фамилия пользователя.
   * @type {string}
   * @required
   */
  @Prop({ required: true })
  surname: string;

  /**
   * Отчество пользователя.
   * @type {string}
   * @required
   */
  @Prop({ required: true })
  patronymic: string;

  /**
   * Дата рождения пользователя.
   * @type {Date}
   * @required
   */
  @Prop({ required: true })
  birthDate: Date;

  /**
   * Пол пользователя.
   * @type {string}
   * @required
   */
  @Prop({ required: true })
  gender: string;

  /**
   * Страна пользователя.
   * @type {string}
   * @required
   */
  @Prop({ required: true })
  country: string;

  /**
   * Город пользователя.
   * @type {string}
   * @required
   */
  @Prop({ required: true })
  city: string;

  /**
   * Email пользователя.
   * @type {string}
   * @required
   */
  @Prop({ required: true })
  email: string;

  /**
   * Телефон пользователя.
   * @type {string}
   * @required
   */
  @Prop({ required: true })
  phone: string;

  /**
   * Адрес пользователя.
   * @type {Address}
   * @required
   */
  @Prop({ required: true })
  address: Address;

  /**
   * Компания пользователя.
   * @type {Company}
   * @optional
   */
  @Prop({ required: false })
  company: Company;

  /**
   * Роль пользователя.
   * @type {string}
   * @required
   * @enum ['admin', 'manager', 'teacher', 'student']
   */
  @Prop({ required: true, enum: ['admin', 'manager', 'teacher', 'student'] })
  role: string;

  /**
   * Является ли пользователь администратором.
   * @type {boolean}
   * @default false
   */
  @Prop({ default: false })
  isAdmin: boolean;

  /**
   * Конструктор класса User.
   * @param {UserDto} userDto - dto пользователя.
   */
  constructor(userDto: UserDto) {
    this.id = userDto.id;
    this.name = userDto.name;
    this.surname = userDto.surname;
    this.patronymic = userDto.patronymic;
    this.birthDate = userDto.birthDate;
    this.gender = userDto.gender;
    this.country = userDto.country;
    this.city = userDto.city;
    this.email = userDto.email;
    this.phone = userDto.phone;
    this.address = userDto.address;
    this.company = userDto.company;
    this.role = userDto.role;
    this.isAdmin = userDto.isAdmin;
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
