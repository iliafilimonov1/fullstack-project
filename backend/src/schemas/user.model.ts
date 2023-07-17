import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

interface Address {
  street: string;
  suite: string;
  city: string;
}

interface Company {
  name: string;
  position: string;
}

@Schema()
export class User {
  /**
   * Имя пользователя.
   */
  @Prop({ required: true })
  name: string;

  /**
   * Фамилия пользователя.
   */
  @Prop({ required: true })
  surname: string;

  /**
   * Отчество пользователя.
   */
  @Prop({ required: true })
  patronymic: string;

  /**
   * Дата рождения пользователя.
   */
  @Prop({ required: true })
  birthDate: Date;

  /**
   * Пол пользователя.
   */
  @Prop({ required: true })
  gender: string;

  /**
   * Страна пользователя.
   */
  @Prop({ required: true })
  country: string;

  /**
   * Город пользователя.
   */
  @Prop({ required: true })
  city: string;

  /**
   * Email пользователя.
   */
  @Prop({ required: true })
  email: string;

  /**
   * Телефон пользователя.
   */
  @Prop({ required: true })
  phone: string;

  /**
   * Адрес пользователя.
   */
  @Prop({ required: true })
  address: Address;

  /**
   * Компания пользователя.
   */
  @Prop({ required: false })
  company: Company;

  /**
   * Роль пользователя.
   * Допустимые значения: 'admin', 'manager', 'teacher', 'student'.
   */
  @Prop({ required: true, enum: ['admin', 'manager', 'teacher', 'student'] })
  role: string;

  /**
   * Является ли пользователь администратором.
   */
  @Prop({ default: false })
  isAdmin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
