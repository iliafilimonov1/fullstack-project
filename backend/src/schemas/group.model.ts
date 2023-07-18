import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Group extends Document {
  /**
   * Название группы.
   * @type {string}
   */
  @Prop()
  name: string;

  /**
   * Идентификатор студента, связанного с группой.
   * @type {Types.ObjectId}
   */
  @Prop({ type: Types.ObjectId, ref: 'Student' })
  student: Types.ObjectId;

  /**
   * Идентификаторы студентов, связанных с группой.
   * @type {Types.ObjectId[]}
   */
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Student' }] })
  studentIds: Types.ObjectId[];
}

/**
 * Схема для модели Group.
 * @type {import('mongoose').Schema<Group>}
 */
export const GroupSchema = SchemaFactory.createForClass(Group);
