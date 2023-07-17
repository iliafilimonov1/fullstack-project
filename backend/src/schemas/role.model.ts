import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * Интерфейс представляющий документ роли в базе данных.
 */
export type RoleDocument = Role & Document;

@Schema()
export class Role {
  /**
   * Название роли.
   */
  @Prop({ required: true })
  name: string;

  /**
   * Схема для модели роли в базе данных.
   */
  @Prop({ required: true, type: [String] })
  permissions: string[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
