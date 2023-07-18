import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * Модель администратора.
 */
@Schema()
export class Admin extends Document {
  /**
   * Логин администратора.
   * @type {string}
   */
  @Prop({ required: true })
  username: string;

  /**
   * Пароль администратора.
   * @type {string}
   */
  @Prop({ required: true })
  password: string;
}

/**
 * Схема для модели Admin.
 * @type {import('mongoose').Schema<Admin>}
 */
export const AdminSchema = SchemaFactory.createForClass(Admin);
